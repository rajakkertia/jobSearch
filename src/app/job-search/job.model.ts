export interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city?: string;
  job_description: string;
  job_apply_link: string;
  job_country?: string;
  job_posted_at_datetime_utc?: string;
  employer_logo?: string;
  job_is_remote?: boolean;
  job_employment_type?: string;
}
