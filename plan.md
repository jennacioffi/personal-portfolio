# Peresonal Portfolio Software Planning File

This file is used internally for designing -> data setup and concepts to be written down as notes and kept close by for quick reference.

## Portfolio Page - Timeline Card Data Structure

- DB Structure for Timeline Card Data

```json
{
  title: string, // project/career/job name
  startDate: date-string,
  endDate: date-string,
  description: string,
  skills: string[], // list of skills for chips
  type: "work" | "project" | "component", // for the icons
  link: string,
}
```
