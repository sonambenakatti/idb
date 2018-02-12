#!/usr/bin/env python

from github import Github

g = Github(client_id="5ab8062c170c1245b85d", client_secret="4bf2688b6b191ba1df0330ad63fe16f8a58f57c4")

repo = g.get_user("sonambenakatti").get_repo("idb")
open_issues = repo.open_issues_count # Number of open issues to be added to the number of closed issues

# Get number of commits for each user
def user_commits():
    commits = {}
    stats = repo.get_stats_contributors()
    while(stats == None):
        stats = repo.get_stats_contributors()
    for contributor in stats:
        name = contributor.author.name
        total = contributor.total
        if name == "Amrutha Sreedharane":
            commits["amrutha"] = total
        elif name == "Sonam Benakatti":
            commits["sonam"] = total
        elif name == "Jennifer Rethi":
            commits["jenni"] = total
        elif name == "Ruchi Shekar":
            commits["ruchi"] = total
        elif name == "Jaemin":
            commits["jaemin"] = total
    commits["total"] = commits["amrutha"] + commits["sonam"] + commits["jenni"] + commits["ruchi"] + commits["jaemin"]
    return commits

# Get number of issues each user has closed
def user_issues():
    issues = {"amrutha": 0, "sonam": 0, "jenni": 0, "ruchi": 0, "jaemin": 0}
    for issue in repo.get_issues(state="closed"):
        name = issue.closed_by.name
        if name == "Amrutha Sreedharane":
            issues["amrutha"] += 1
        elif name == "Sonam Benakatti":
            issues["sonam"] += 1
        elif name == "Jennifer Rethi":
            issues["jenni"] += 1
        elif name == "Ruchi Shekar":
            issues["ruchi"] += 1
        elif name == "Jaemin":
            issues["jaemin"] += 1
    issues["total"] = issues["amrutha"] + issues["sonam"] + issues["jenni"] + issues["ruchi"] + issues["jaemin"]
    return issues
