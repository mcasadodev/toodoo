DROP TABLE [dbo].[users]
GO
CREATE TABLE [dbo].[users] (
	[id] [int] IDENTITY(2147400000,1) NOT NULL,
	[firstName] [nvarchar](50) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[email] [nvarchar](1000) NOT NULL,
	[rights] [int] NOT NULL,
	[image] [nvarchar] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[users] ADD PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

SELECT * from users