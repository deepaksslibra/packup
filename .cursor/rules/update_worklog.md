# Update Worklog

## Description
This rule adds an entry to update the worklog.md file whenever code is pushed.

## When to Use
Use this rule every time you're preparing to commit and push code changes.

## Usage
1. After making code changes, run `git add` to stage your changes
2. Before committing, run `cursor run update_worklog`
3. When prompted, provide a brief summary of the changes you made
4. The worklog will be automatically updated with a new entry
5. Stage the updated worklog file with `git add worklog.md`
6. Complete your commit and push

## Implementation

```bash
#!/bin/bash

# Get current date in YYYY-MM-DD format
DATE=$(date +"%Y-%m-%d")

# Ask user for summary of changes
echo "Please provide a summary of changes for the worklog:"
read SUMMARY

# Determine if there's an entry for today already
if grep -q "^## $DATE:" worklog.md; then
  # Add to today's entry
  sed -i '' "/^## $DATE:/a\\
\\
### Changes\\
- $SUMMARY" worklog.md
else
  # Create a new entry for today
  sed -i '' "4i\\
## $DATE: Development Update\\
\\
### Changes\\
- $SUMMARY\\
" worklog.md
fi

echo "Worklog updated! Don't forget to stage the changes with 'git add worklog.md'"
```

## Notes
- This rule requires manual execution (it's not automatic)
- Make sure to stage and commit the updated worklog file
- If you want this to be fully automatic, consider adding it to your Husky pre-commit hook 