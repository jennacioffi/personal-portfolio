# Personal Portfolio Software Planning File

This file is used internally for designing -> data setup and concepts to be written down as notes and kept close by for quick reference.

## Tables for Timeline Data

```
Careers
────────────────────────
id          integer
company     text
title       text
start_date  date
end_date    date | null
description text | null
link        text | null
skills      text[]
```

```
Projects
────────────────────────
id           integer
name         text
description  text | null
start_date   date | null
end_date     date | null
career_id    integer | null
link         text | null
skills       text[]
```

## Portfolio Page - Timeline Card Data Structure

- Will be fetched from the database via the `Careers` and `Projects` tables to show a living resume

### DB Structure for Timeline Card Data

```typescript
{
  type TimelineItem = {
    id: number;
    title: string;
    startDate: string | null;
    endDate: string | null;
    description: string;
    skills: string[];
    type: 'career' | 'project';
    careerId: number | null;
    link: string | null;
  };
}
```

Field Purpose

- `id` - Identifies the underlying career/project
- `title` - Display name of the timeline item
- `startDate` - Start date
- `endDate` - End date; null means ongoing/unknown
- `description` - Display description
- `skills`- Skills displayed as chips
- `type` - Determines whether the card displays the career or project icon
- `careerId` - Links a project to its associated career
- `link` - Optional external link

### Card Basic Functionality

- Clicking the card will open a dialog/drawer view showing more detail about the data
