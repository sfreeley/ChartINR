USE [ChartINR];
GO

--UserProfile
set identity_insert [UserProfile] on
insert into UserProfile (Id, Username, Email, FirebaseUserId) values (1, 'hello123', 'hello@hello.com', 'J9kYxmJYLzgKlgwa9KNkbw0Hakm2');
insert into UserProfile (Id, Username, Email, FirebaseUserId) values (2, 'woot234', 'woot@woot.com', 'lpu1VNtHF6cnrWSe4eQ7zsH1sD42');
set identity_insert [UserProfile] off

--WarfarinUser
set identity_insert [WarfarinUser] on
insert into WarfarinUser (Id, UserProfileId, FirstName, LastName) values (1, 1, 'Test1', 'Test1');
insert into WarfarinUser (Id, UserProfileId, FirstName, LastName) values (2, 1, 'Test2', 'Test2');
insert into WarfarinUser (Id, UserProfileId, FirstName, LastName) values (3, 2, 'Test3', 'Test3');
insert into WarfarinUser (Id, UserProfileId, FirstName, LastName) values (4, 2, 'Test4', 'Test4');
set identity_insert [WarfarinUser] off

--Range
set identity_insert [INRRange] on
insert into [INRRange] ([Id], [WarfarinUserId], [MinLevel], [MaxLevel], [isActive]) values (1, 1, 2.0, 3.0, 1);
insert into [INRRange] ([Id], [WarfarinUserId], [MinLevel], [MaxLevel], [isActive]) values (2, 1, 2.5, 3.5, 0); 
insert into [INRRange] ([Id], [WarfarinUserId], [MinLevel], [MaxLevel], [isActive]) values (3, 2, 2.0, 3.0, 1);
set identity_insert [INRRange] off

--Reminder
set identity_insert [Reminder] on
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (1, 1, '2019-12-16', 0);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (2, 1, '2019-12-17', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (3, 1, '2019-12-30', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (4, 1, '2020-01-13', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (5, 1, '2020-01-31', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (6, 1, '2020-02-12', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (7, 1, '2020-02-25', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (8, 1, '2020-03-17', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (9, 1, '2020-04-06', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (10, 1, '2020-04-30', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (11, 1, '2020-05-26', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (12, 1, '2020-06-24', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (13, 1, '2020-07-08', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (14, 1, '2020-07-15', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (15, 1, '2020-08-05', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (16, 1, '2020-08-19', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (17, 1, '2020-09-09', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (18, 1, '2020-09-30', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (19, 1, '2020-10-27', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (20, 1, '2020-12-03', 1);
insert into [Reminder] ([Id], [WarfarinUserId], [DateForNextLevel], [Completed]) values (21, 1, '2021-01-12', 0);
set identity_insert [Reminder] off

--Dose
set identity_insert [Dose] on
insert into [Dose] ([Id], [WarfarinUserId], [DateInput], [WeeklyDose], [IsActive]) values (1, 1, '2019-12-16', '35mg', 0);
insert into [Dose] ([Id], [WarfarinUserId], [DateInput], [WeeklyDose], [IsActive]) values (2, 1, '2020-01-31', '32.5mg', 1);
insert into [Dose] ([Id], [WarfarinUserId], [DateInput], [WeeklyDose], [IsActive]) values (3, 2, '2020-03-15', '28mg', 1);
set identity_insert [Dose] off

--Level
set identity_insert [Level] on
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (1, 1, 1, NULL, '2019-12-09', 3.4, 0, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (2, 1, 1, 2, '2019-12-17', 4.0, 0, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (3, 1, 1, 3, '2019-12-30', 3.0, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (4, 1, 1, 4, '2020-01-13', 2.4, 1, 'had 2 cups of greens')
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (5, 1, 1, 5, '2020-01-31', 3.2, 0, 'had no greens')
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (6, 1, 2, 6, '2020-02-12', 2.8, 1, 'new weekly dosage 32.5mg')
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (7, 1, 2, 7, '2020-02-25', 2.6, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (8, 1, 2, 8, '2020-03-17', 2.4, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (9, 1, 2, 9, '2020-04-06', 2.5, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (10, 1, 2, 10, '2020-04-30', 2.4, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (11, 1, 2, 11, '2020-05-26', 2.2, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (12, 1, 2, 12, '2020-06-24', 1.9, 0, 'had extra cup of greens')
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (13, 1, 2, 13, '2020-07-08', 2.4, 1, 'felt under the weather')
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (14, 1, 2, 14, '2020-07-15', 2.2, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (15, 1, 2, 15, '2020-08-05', 2.4, 1, 'started bactrim abx')
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (16, 1, 2, 16, '2020-08-19', 3.1, 0, 'abx interaction')
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (17, 1, 2, 17, '2020-09-09', 3.0, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (18, 1, 2, 18, '2020-09-30', 2.8, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (19, 1, 2, 19, '2020-10-27', 2.7, 1, NULL)
insert into [Level] ([Id], [INRRangeId], [DoseId], [ReminderId], [DateDrawn], [Result], [InRange], [Comment]) values (20, 1, 2, 20, '2020-12-03', 2.6, 1, NULL)
set identity_insert [Level] off




