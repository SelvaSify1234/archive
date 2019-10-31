export class Faqitem {
	q: String;
	a: String;
}
export const FAQITEMS: Faqitem[]=[
	{
		q:"What is the difference between backing up and archiving data?",
		a:"An archive is a collection of historical records that are kept for long-term retention and used for future reference. Typically, archives contain data that is not actively used. Basically, a backup is a copy of a set of data, while an archive holds original data that has been removed from its original location."
	},
	{
		q:"What happens if the source database and destionation database version(MySQL version) different?",
		a:"We may get some compatabilty issues. Make sure both source and destionation database are same version"
	},
	{
		q:"What is the related tables column in table configurations?",
		a:"When you are going to archive the table based on its related tables, then you must relate tables and its columns. For example if you are going to archive student table whose year of passing is 2001 and department is IT' then table configuration is as follows source table : students,destionation_table: students_2001_IT, related tables : departments condidtion: yearofpassing=2001 and students.dept_id=departments.id and departments.name='IT'"
	},
	{
		q:"What is the condition column in table configurations?",
		a:" Use the columns which has the index. Please check the where conditions before you do archive."
	},
	{
		q:"What is log file?",
		a:"Log contains the information about each table archival process info such as 'Start Time, Client Name, Tables Archived, End Time, Total Time'. It is maintained on daily basis."
	},
	{
		q:"Can I  download the log file?",
		a:"After completion of archival, you download the log file"
	}
]