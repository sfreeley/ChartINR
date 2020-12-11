USE [master]

IF db_id('ChartINR') IS NULL
	CREATE DATABASE [ChartINR]
GO

USE [ChartINR]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Dose];
DROP TABLE IF EXISTS [Range];
DROP TABLE IF EXISTS [Reminder];
DROP TABLE IF EXISTS [Level];
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [Username] NVARCHAR(100) NOT NULL,
  [Email] NVARCHAR(500) NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Dose] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [DateInput] datetime NOT NULL,
  [WeeklyDose] NVARCHAR(100) NOT NULL,
  [IsActive] integer NOT NULL,

  CONSTRAINT [FK_Dose_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Range] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [MinLevel] decimal NOT NULL,
  [MaxLevel] decimal NOT NULL,
  [isActive] integer NOT NULL,

  CONSTRAINT [FK_Range_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Reminder] (
  [Id] integer PRIMARY KEY IDENTITY, 
  [DateForNextLevel] datetime NOT NULL,
  [Completed] integer NOT NULL,  
)

CREATE TABLE [Level] (
  [Id] integer PRIMARY KEY IDENTITY,
  [RangeId] integer NOT NULL,
  [DoseId] integer NOT NULL,
  [ReminderId] integer,
  [DateDrawn] datetime NOT NULL,
  [Comment] NVARCHAR(500),
  [Result] decimal NOT NULL,
  [InRange] integer NOT NULL,

  CONSTRAINT [FK_Level_Range] FOREIGN KEY ([RangeId]) REFERENCES [Range] ([Id]),
  CONSTRAINT [FK_Level_Reminder] FOREIGN KEY ([ReminderId]) REFERENCES [Reminder] ([Id]),
  CONSTRAINT [FK_Level_Dose] FOREIGN KEY ([DoseId]) REFERENCES [Dose] ([Id])
)
GO





