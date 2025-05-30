USE [master]
GO
/****** Object:  Database [RegistreCurricular]    Script Date: 18/05/2025 19:40:17 ******/
CREATE DATABASE [RegistreCurricular]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'RegistreCurricular', FILENAME = N'/var/opt/mssql/data/RegistreCurricular.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'RegistreCurricular_log', FILENAME = N'/var/opt/mssql/data/RegistreCurricular_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [RegistreCurricular] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [RegistreCurricular].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [RegistreCurricular] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [RegistreCurricular] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [RegistreCurricular] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [RegistreCurricular] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [RegistreCurricular] SET ARITHABORT OFF 
GO
ALTER DATABASE [RegistreCurricular] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [RegistreCurricular] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [RegistreCurricular] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [RegistreCurricular] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [RegistreCurricular] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [RegistreCurricular] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [RegistreCurricular] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [RegistreCurricular] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [RegistreCurricular] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [RegistreCurricular] SET  ENABLE_BROKER 
GO
ALTER DATABASE [RegistreCurricular] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [RegistreCurricular] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [RegistreCurricular] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [RegistreCurricular] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [RegistreCurricular] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [RegistreCurricular] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [RegistreCurricular] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [RegistreCurricular] SET RECOVERY FULL 
GO
ALTER DATABASE [RegistreCurricular] SET  MULTI_USER 
GO
ALTER DATABASE [RegistreCurricular] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [RegistreCurricular] SET DB_CHAINING OFF 
GO
ALTER DATABASE [RegistreCurricular] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [RegistreCurricular] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [RegistreCurricular] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [RegistreCurricular] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'RegistreCurricular', N'ON'
GO
ALTER DATABASE [RegistreCurricular] SET QUERY_STORE = ON
GO
ALTER DATABASE [RegistreCurricular] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [RegistreCurricular]
GO
/****** Object:  Table [dbo].[Groups]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groups](
	[UUID] [uniqueidentifier] NOT NULL,
	[Name] [varchar](30) NOT NULL,
	[CenterName] [varchar](100) NOT NULL,
	[CourseName] [varchar](20) NOT NULL,
	[Year] [varchar](9) NULL,
 CONSTRAINT [PK_Groups] PRIMARY KEY CLUSTERED 
(
	[UUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CompetenciesSDA]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompetenciesSDA](
	[UUID] [uniqueidentifier] NOT NULL,
	[UUIDSDA] [uniqueidentifier] NOT NULL,
	[UUIDCompetencies] [uniqueidentifier] NOT NULL,
	[Worked] [bit] NOT NULL,
 CONSTRAINT [PK_CompetenciesSDA] PRIMARY KEY CLUSTERED 
(
	[UUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SDASubjectsRelation]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SDASubjectsRelation](
	[UUIDSDA] [uniqueidentifier] NOT NULL,
	[UUIDSubject] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_SDASubjectsRelation] PRIMARY KEY CLUSTERED 
(
	[UUIDSDA] ASC,
	[UUIDSubject] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CompetenciesTPL]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompetenciesTPL](
	[UUID] [uniqueidentifier] NOT NULL,
	[Type] [tinyint] NOT NULL,
	[UUIDSubject] [uniqueidentifier] NOT NULL,
	[OrderBy] [tinyint] NOT NULL,
	[Description] [varchar](max) NOT NULL,
 CONSTRAINT [PK_CompetenciesTPL] PRIMARY KEY CLUSTERED 
(
	[UUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CriteriaTPL]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CriteriaTPL](
	[UUID] [uniqueidentifier] NOT NULL,
	[UUIDCompetencie] [uniqueidentifier] NOT NULL,
	[Description] [varchar](max) NOT NULL,
	[OrderByMain] [tinyint] NOT NULL,
	[OrderBy] [tinyint] NOT NULL,
 CONSTRAINT [PK_CriteriaTPL] PRIMARY KEY CLUSTERED 
(
	[UUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CriteriaSDA]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CriteriaSDA](
	[UUID] [uniqueidentifier] NOT NULL,
	[UUIDSDA] [uniqueidentifier] NOT NULL,
	[UUIDCriteria] [uniqueidentifier] NOT NULL,
	[Worked] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubjectsTPL]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubjectsTPL](
	[UUID] [uniqueidentifier] NOT NULL,
	[Name] [varchar](70) NOT NULL,
	[TemplateName] [varchar](20) NOT NULL,
	[Type] [tinyint] NOT NULL,
 CONSTRAINT [PK_SubjectsTPL_1] PRIMARY KEY CLUSTERED 
(
	[UUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SDA]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SDA](
	[UUID] [uniqueidentifier] NOT NULL,
	[UUIDUser] [uniqueidentifier] NOT NULL,
	[UUIDGroup] [uniqueidentifier] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Title] [varchar](30) NOT NULL,
	[Description] [varchar](max) NOT NULL,
 CONSTRAINT [PK_SDA] PRIMARY KEY CLUSTERED 
(
	[UUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[vFullSda3]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vFullSda3] AS
SELECT 
    sda.UUID AS SDA_UUID,
    sda.Title AS SDA_Title,
    sda.Description AS SDA_Description,
    sda.CreatedAt AS SDA_CreatedAt,
    g.Name AS Group_Name,
    st.UUID AS Subject_UUID,
    st.Name AS Subject_Name,
    st.TemplateName AS Subject_Template,
    ct.UUID AS Competency_UUIDTPL,        -- UUID de CompetenciesTPL
    csda.UUID AS Competency_UUID,           -- UUID de CompetenciesSDA (la relació)
    ct.Description AS Competency_Description,
    ct.OrderBy AS Competency_Order,
    csda.Worked AS Competency_Worked,
    cr.UUID AS Criteria_UUIDTPL,           -- UUID de CriteriaTPL
    crsda.UUID AS Criteria_UUID,           -- UUID de CriteriaSDA (la relació)
    cr.Description AS Criteria_Description,
    cr.OrderByMain AS Criteria_MainOrder,
    cr.OrderBy AS Criteria_Order,
    crsda.Worked AS Criteria_Worked
FROM dbo.SDA sda
LEFT JOIN dbo.Groups g 
    ON sda.UUIDGroup = g.UUID
LEFT JOIN dbo.SDASubjectsRelation ssr 
    ON sda.UUID = ssr.UUIDSDA
LEFT JOIN dbo.SubjectsTPL st 
    ON ssr.UUIDSubject = st.UUID
LEFT JOIN dbo.CompetenciesTPL ct 
    ON st.UUID = ct.UUIDSubject
LEFT JOIN dbo.CompetenciesSDA csda 
    ON sda.UUID = csda.UUIDSDA 
    AND csda.UUIDCompetencies = ct.UUID
LEFT JOIN dbo.CriteriaTPL cr 
    ON ct.UUID = cr.UUIDCompetencie
LEFT JOIN dbo.CriteriaSDA crsda 
    ON sda.UUID = crsda.UUIDSDA 
    AND crsda.UUIDCriteria = cr.UUID;
GO
/****** Object:  View [dbo].[SdaCriteriaSummary]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[SdaCriteriaSummary] AS
SELECT 
  sda.UUIDGroup,
  ct.UUID AS CriteriaUUIDTPL,
  ct.Description AS CriteriaDescription,
  SUM(CASE WHEN cs.Worked = 1 THEN 1 ELSE 0 END) AS WorkedCount
FROM dbo.CriteriaSDA cs
INNER JOIN dbo.CriteriaTPL ct
  ON cs.UUIDCriteria = ct.UUID
INNER JOIN dbo.SDA sda
  ON cs.UUIDSDA = sda.UUID
GROUP BY sda.UUIDGroup, ct.UUID, ct.Description;
GO
/****** Object:  View [dbo].[Test]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Test]
AS
SELECT TOP (100) PERCENT dbo.SDA.UUIDGroup, dbo.SubjectsTPL.Name AS Subject, dbo.CompetenciesTPL.Description AS CompetencyDescription, dbo.CompetenciesTPL.OrderBy AS OrderByCompetency, 
                  dbo.CriteriaTPL.Description AS CriteriaDescription, dbo.CriteriaTPL.OrderByMain AS OrderByMainCriteria, dbo.CriteriaTPL.OrderBy AS OrderByCriteria, SUM(CAST(dbo.CriteriaSDA.Worked AS int)) AS TotalWorked
FROM     dbo.CriteriaTPL LEFT OUTER JOIN
                  dbo.CompetenciesTPL ON dbo.CriteriaTPL.UUIDCompetencie = dbo.CompetenciesTPL.UUID LEFT OUTER JOIN
                  dbo.SubjectsTPL ON dbo.CompetenciesTPL.UUIDSubject = dbo.SubjectsTPL.UUID LEFT OUTER JOIN
                  dbo.CriteriaSDA ON dbo.CriteriaTPL.UUID = dbo.CriteriaSDA.UUIDCriteria LEFT OUTER JOIN
                  dbo.SDA ON dbo.CriteriaSDA.UUIDSDA = dbo.SDA.UUID
GROUP BY dbo.SDA.UUIDGroup, dbo.CriteriaTPL.Description, dbo.CompetenciesTPL.OrderBy, dbo.CompetenciesTPL.Description, dbo.SubjectsTPL.Name, dbo.CriteriaTPL.OrderByMain, dbo.CriteriaTPL.OrderBy
ORDER BY TotalWorked
GO
/****** Object:  Table [dbo].[Centers]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Centers](
	[Name] [varchar](100) NOT NULL,
	[Municipality] [varchar](30) NOT NULL,
 CONSTRAINT [PK_Centers] PRIMARY KEY CLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[Name] [varchar](20) NOT NULL,
	[TemplateName] [varchar](20) NOT NULL,
 CONSTRAINT [PK_Courses] PRIMARY KEY CLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserCenterRelation]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserCenterRelation](
	[UUIDUser] [uniqueidentifier] NOT NULL,
	[CenterName] [varchar](100) NOT NULL,
	[Role] [tinyint] NULL,
 CONSTRAINT [PK_UserCenterRelation] PRIMARY KEY CLUSTERED 
(
	[UUIDUser] ASC,
	[CenterName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserGroupRelation]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGroupRelation](
	[UUIDUser] [uniqueidentifier] NOT NULL,
	[UUIDGroup] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_UserGroupRelation] PRIMARY KEY CLUSTERED 
(
	[UUIDUser] ASC,
	[UUIDGroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UUID] [uniqueidentifier] NOT NULL,
	[Name] [varchar](30) NULL,
	[Email] [varchar](50) NOT NULL,
	[UserRole] [tinyint] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserSdaRelation]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserSdaRelation](
	[UUIDUser] [uniqueidentifier] NOT NULL,
	[UUIDSDA] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_UserSdaRelation] PRIMARY KEY CLUSTERED 
(
	[UUIDUser] ASC,
	[UUIDSDA] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VectorsSDA]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VectorsSDA](
	[NameVector] [varchar](20) NOT NULL,
	[UUIDSDA] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_VectorsSDA] PRIMARY KEY CLUSTERED 
(
	[NameVector] ASC,
	[UUIDSDA] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VectorsTPL]    Script Date: 18/05/2025 19:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VectorsTPL](
	[Name] [varchar](20) NOT NULL,
	[TemplateName] [varchar](20) NOT NULL,
 CONSTRAINT [PK_VectorsTPL] PRIMARY KEY CLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CompetenciesSDA] ADD  CONSTRAINT [DF_CompetenciesSDA_UUID]  DEFAULT (newid()) FOR [UUID]
GO
ALTER TABLE [dbo].[CompetenciesTPL] ADD  CONSTRAINT [DF_CompetenciesTPL_UUID]  DEFAULT (newid()) FOR [UUID]
GO
ALTER TABLE [dbo].[CriteriaSDA] ADD  CONSTRAINT [DF_CriteriaSDA_UUID]  DEFAULT (newid()) FOR [UUID]
GO
ALTER TABLE [dbo].[CriteriaTPL] ADD  CONSTRAINT [DF_CriteriaTPL_UUID]  DEFAULT (newid()) FOR [UUID]
GO
ALTER TABLE [dbo].[Groups] ADD  CONSTRAINT [DF_Groups_UUID]  DEFAULT (newid()) FOR [UUID]
GO
ALTER TABLE [dbo].[SDA] ADD  CONSTRAINT [DF_SDA_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[SubjectsTPL] ADD  CONSTRAINT [DF_SubjectsTPL_UUID]  DEFAULT (newid()) FOR [UUID]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_UUID]  DEFAULT (newid()) FOR [UUID]
GO
ALTER TABLE [dbo].[CompetenciesSDA]  WITH CHECK ADD  CONSTRAINT [FK_CompetenciesSDA_CompetenciesTPL] FOREIGN KEY([UUIDCompetencies])
REFERENCES [dbo].[CompetenciesTPL] ([UUID])
GO
ALTER TABLE [dbo].[CompetenciesSDA] CHECK CONSTRAINT [FK_CompetenciesSDA_CompetenciesTPL]
GO
ALTER TABLE [dbo].[CompetenciesSDA]  WITH CHECK ADD  CONSTRAINT [FK_CompetenciesSDA_SDA] FOREIGN KEY([UUIDSDA])
REFERENCES [dbo].[SDA] ([UUID])
GO
ALTER TABLE [dbo].[CompetenciesSDA] CHECK CONSTRAINT [FK_CompetenciesSDA_SDA]
GO
ALTER TABLE [dbo].[CompetenciesTPL]  WITH CHECK ADD  CONSTRAINT [FK_CompetenciesTPL_SubjectsTPL] FOREIGN KEY([UUIDSubject])
REFERENCES [dbo].[SubjectsTPL] ([UUID])
GO
ALTER TABLE [dbo].[CompetenciesTPL] CHECK CONSTRAINT [FK_CompetenciesTPL_SubjectsTPL]
GO
ALTER TABLE [dbo].[CriteriaSDA]  WITH CHECK ADD  CONSTRAINT [FK_CriteriaSDA_CriteriaTPL] FOREIGN KEY([UUIDCriteria])
REFERENCES [dbo].[CriteriaTPL] ([UUID])
GO
ALTER TABLE [dbo].[CriteriaSDA] CHECK CONSTRAINT [FK_CriteriaSDA_CriteriaTPL]
GO
ALTER TABLE [dbo].[CriteriaSDA]  WITH CHECK ADD  CONSTRAINT [FK_CriteriaSDA_SDA] FOREIGN KEY([UUIDSDA])
REFERENCES [dbo].[SDA] ([UUID])
GO
ALTER TABLE [dbo].[CriteriaSDA] CHECK CONSTRAINT [FK_CriteriaSDA_SDA]
GO
ALTER TABLE [dbo].[CriteriaTPL]  WITH CHECK ADD  CONSTRAINT [FK_CriteriaTPL_CompetenciesTPL] FOREIGN KEY([UUIDCompetencie])
REFERENCES [dbo].[CompetenciesTPL] ([UUID])
GO
ALTER TABLE [dbo].[CriteriaTPL] CHECK CONSTRAINT [FK_CriteriaTPL_CompetenciesTPL]
GO
ALTER TABLE [dbo].[Groups]  WITH CHECK ADD  CONSTRAINT [FK_Groups_Centers] FOREIGN KEY([CenterName])
REFERENCES [dbo].[Centers] ([Name])
GO
ALTER TABLE [dbo].[Groups] CHECK CONSTRAINT [FK_Groups_Centers]
GO
ALTER TABLE [dbo].[Groups]  WITH CHECK ADD  CONSTRAINT [FK_Groups_Courses] FOREIGN KEY([CourseName])
REFERENCES [dbo].[Courses] ([Name])
GO
ALTER TABLE [dbo].[Groups] CHECK CONSTRAINT [FK_Groups_Courses]
GO
ALTER TABLE [dbo].[SDA]  WITH CHECK ADD  CONSTRAINT [FK_SDA_Groups] FOREIGN KEY([UUIDGroup])
REFERENCES [dbo].[Groups] ([UUID])
GO
ALTER TABLE [dbo].[SDA] CHECK CONSTRAINT [FK_SDA_Groups]
GO
ALTER TABLE [dbo].[SDA]  WITH CHECK ADD  CONSTRAINT [FK_SDA_Users] FOREIGN KEY([UUIDUser])
REFERENCES [dbo].[Users] ([UUID])
GO
ALTER TABLE [dbo].[SDA] CHECK CONSTRAINT [FK_SDA_Users]
GO
ALTER TABLE [dbo].[SDASubjectsRelation]  WITH CHECK ADD  CONSTRAINT [FK_SDASubjectsRelation_SDA] FOREIGN KEY([UUIDSDA])
REFERENCES [dbo].[SDA] ([UUID])
GO
ALTER TABLE [dbo].[SDASubjectsRelation] CHECK CONSTRAINT [FK_SDASubjectsRelation_SDA]
GO
ALTER TABLE [dbo].[SDASubjectsRelation]  WITH CHECK ADD  CONSTRAINT [FK_SDASubjectsRelation_SubjectsTPL] FOREIGN KEY([UUIDSubject])
REFERENCES [dbo].[SubjectsTPL] ([UUID])
GO
ALTER TABLE [dbo].[SDASubjectsRelation] CHECK CONSTRAINT [FK_SDASubjectsRelation_SubjectsTPL]
GO
ALTER TABLE [dbo].[UserCenterRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserCenterRelation_Centers] FOREIGN KEY([CenterName])
REFERENCES [dbo].[Centers] ([Name])
GO
ALTER TABLE [dbo].[UserCenterRelation] CHECK CONSTRAINT [FK_UserCenterRelation_Centers]
GO
ALTER TABLE [dbo].[UserCenterRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserCenterRelation_Users] FOREIGN KEY([UUIDUser])
REFERENCES [dbo].[Users] ([UUID])
GO
ALTER TABLE [dbo].[UserCenterRelation] CHECK CONSTRAINT [FK_UserCenterRelation_Users]
GO
ALTER TABLE [dbo].[UserGroupRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserGroupRelation_Groups] FOREIGN KEY([UUIDGroup])
REFERENCES [dbo].[Groups] ([UUID])
GO
ALTER TABLE [dbo].[UserGroupRelation] CHECK CONSTRAINT [FK_UserGroupRelation_Groups]
GO
ALTER TABLE [dbo].[UserGroupRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserGroupRelation_Users] FOREIGN KEY([UUIDUser])
REFERENCES [dbo].[Users] ([UUID])
GO
ALTER TABLE [dbo].[UserGroupRelation] CHECK CONSTRAINT [FK_UserGroupRelation_Users]
GO
ALTER TABLE [dbo].[UserSdaRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserSdaRelation_SDA] FOREIGN KEY([UUIDSDA])
REFERENCES [dbo].[SDA] ([UUID])
GO
ALTER TABLE [dbo].[UserSdaRelation] CHECK CONSTRAINT [FK_UserSdaRelation_SDA]
GO
ALTER TABLE [dbo].[UserSdaRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserSdaRelation_Users] FOREIGN KEY([UUIDUser])
REFERENCES [dbo].[Users] ([UUID])
GO
ALTER TABLE [dbo].[UserSdaRelation] CHECK CONSTRAINT [FK_UserSdaRelation_Users]
GO
ALTER TABLE [dbo].[VectorsSDA]  WITH CHECK ADD  CONSTRAINT [FK_VectorsSDA_SDA] FOREIGN KEY([UUIDSDA])
REFERENCES [dbo].[SDA] ([UUID])
GO
ALTER TABLE [dbo].[VectorsSDA] CHECK CONSTRAINT [FK_VectorsSDA_SDA]
GO
ALTER TABLE [dbo].[VectorsSDA]  WITH CHECK ADD  CONSTRAINT [FK_VectorsSDA_VectorsTPL] FOREIGN KEY([NameVector])
REFERENCES [dbo].[VectorsTPL] ([Name])
GO
ALTER TABLE [dbo].[VectorsSDA] CHECK CONSTRAINT [FK_VectorsSDA_VectorsTPL]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[47] 4[3] 2[23] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "CriteriaTPL"
            Begin Extent = 
               Top = 190
               Left = 704
               Bottom = 353
               Right = 922
            End
            DisplayFlags = 280
            TopColumn = 1
         End
         Begin Table = "SDA"
            Begin Extent = 
               Top = 2
               Left = 717
               Bottom = 165
               Right = 911
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "CriteriaSDA"
            Begin Extent = 
               Top = 7
               Left = 48
               Bottom = 170
               Right = 242
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "CompetenciesTPL"
            Begin Extent = 
               Top = 218
               Left = 1146
               Bottom = 381
               Right = 1340
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SubjectsTPL"
            Begin Extent = 
               Top = 7
               Left = 959
               Bottom = 170
               Right = 1157
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 10
         Width = 284
         Width = 1200
         Width = 1200
         Width = 1200
         Width = 1200
         Width = 1740
         Width = 1200
         Width = 1200
         Width = 1200
         Width = 1200
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 12
         Colu' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'Test'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'mn = 1440
         Alias = 900
         Table = 1176
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1356
         SortOrder = 1416
         GroupBy = 1350
         Filter = 1356
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'Test'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'Test'
GO
USE [master]
GO
ALTER DATABASE [RegistreCurricular] SET  READ_WRITE 
GO
