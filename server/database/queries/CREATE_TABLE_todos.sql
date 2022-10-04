DROP TABLE todos
    GO
CREATE TABLE todos (
	[id] [int] IDENTITY(2147400000,1) NOT NULL,
	[title] [nvarchar](50) NOT NULL,
	[creator] [nvarchar](50) NOT NULL,
	[message] [nvarchar](1000) NULL,
	[tags] [nvarchar](500) NULL,
	[image] [nvarchar](1) NULL,
	[likeCount] [int] NOT NULL,
	[creationDate] [date] NOT NULL,    
	[updateDate] [date] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[todos] ADD PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO