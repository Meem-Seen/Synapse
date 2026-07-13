-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql/new)

-- 1. PROFILES table (syncs with auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text not null,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. ROOMS table
create table if not exists public.rooms (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_by uuid references public.profiles(id) not null,
  created_at timestamptz default now()
);

alter table public.rooms enable row level security;

create policy "Anyone can view rooms"
  on public.rooms for select
  using (true);

create policy "Authenticated users can create rooms"
  on public.rooms for insert
  with check (auth.role() = 'authenticated');

-- 3. ROOM MEMBERS table
create table if not exists public.room_members (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references public.rooms(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  joined_at timestamptz default now(),
  unique (room_id, user_id)
);

alter table public.room_members enable row level security;

create policy "Members can view room members"
  on public.room_members for select
  using (true);

create policy "Users can join rooms"
  on public.room_members for insert
  with check (auth.uid() = user_id);

-- 4. CHAT MESSAGES table
create table if not exists public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references public.rooms(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  text text not null,
  created_at timestamptz default now()
);

alter table public.chat_messages enable row level security;

create policy "Room members can view messages"
  on public.chat_messages for select
  using (exists (
    select 1 from public.room_members
    where room_id = chat_messages.room_id and user_id = auth.uid()
  ));

create policy "Authenticated users can send messages"
  on public.chat_messages for insert
  with check (auth.uid() = user_id);

-- 5. CODE SESSIONS table
create table if not exists public.code_sessions (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references public.rooms(id) on delete cascade unique not null,
  content text default '',
  language text default 'javascript',
  updated_by uuid references public.profiles(id),
  updated_at timestamptz default now()
);

alter table public.code_sessions enable row level security;

create policy "Room members can view code"
  on public.code_sessions for select
  using (exists (
    select 1 from public.room_members
    where room_id = code_sessions.room_id and user_id = auth.uid()
  ));

create policy "Room members can update code"
  on public.code_sessions for insert
  with check (exists (
    select 1 from public.room_members
    where room_id = code_sessions.room_id and user_id = auth.uid()
  ));

create policy "Room members can update existing code"
  on public.code_sessions for update
  using (exists (
    select 1 from public.room_members
    where room_id = code_sessions.room_id and user_id = auth.uid()
  ));

-- 6. WHITEBOARD SCENES table
create table if not exists public.whiteboard_scenes (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references public.rooms(id) on delete cascade unique not null,
  scene_data jsonb default '{}',
  app_state jsonb default '{}',
  updated_by uuid references public.profiles(id),
  updated_at timestamptz default now()
);

alter table public.whiteboard_scenes enable row level security;

create policy "Room members can view whiteboard"
  on public.whiteboard_scenes for select
  using (exists (
    select 1 from public.room_members
    where room_id = whiteboard_scenes.room_id and user_id = auth.uid()
  ));

create policy "Room members can update whiteboard"
  on public.whiteboard_scenes for insert
  with check (exists (
    select 1 from public.room_members
    where room_id = whiteboard_scenes.room_id and user_id = auth.uid()
  ));

create policy "Room members can update existing whiteboard"
  on public.whiteboard_scenes for update
  using (exists (
    select 1 from public.room_members
    where room_id = whiteboard_scenes.room_id and user_id = auth.uid()
  ));

-- 7. Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
