from github import Github
from github.Repository import Repository
import os
from dotenv import load_dotenv

from app.schemas.agama import AgamaContract, Sattva, Sankalpa, Shakti, Ahvana, Samvada, Parinama, Maryada, Sakshi

load_dotenv()

class DiscoveryService:
    def __init__(self):
        # Use GITHUB_TOKEN from env or fall back to unauthenticated (rate limited)
        self.github = Github(os.getenv("GITHUB_TOKEN"))

    def search_agents(self, query: str = "topic:agent") -> list[AgamaContract]:
        """
        Searches GitHub for repositories matching the query and converts them
        into provisional ĀGAMA contracts.
        """
        repos = self.github.search_repositories(query=query, sort="stars", order="desc")
        results = []
        
        # Limit to top 10 to avoid hitting rate limits immediately
        for repo in repos[:10]:
            try:
                contract = self._convert_repo_to_agama(repo)
                results.append(contract)
            except Exception as e:
                print(f"Skipping {repo.name}: {e}")
                continue
                
        return results

    def _convert_repo_to_agama(self, repo: Repository) -> AgamaContract:
        """
        Maps a GitHub Repository object to a valid ĀGAMA contract.
        Infers missing fields with 'Unknown' or defaults.
        """
        # 1. Sattva (Identity)
        sattva = Sattva(
            name=repo.name,
            version="0.0.1", # Default
            description=repo.description or "No description provided",
            author=repo.owner.login,
            repository=repo.html_url,
            license=repo.license.spdx_id if repo.license else "UNLICENSED"
        )

        # 2. Sankalpa (Intention) - Inferred from topics
        topics = repo.get_topics()
        role = "executor" # Default
        if "assistant" in topics: role = "assistant"
        if "research" in topics: role = "researcher"

        sankalpa = Sankalpa(
            goal=f"To execute tasks related to {', '.join(topics[:3])}" if topics else "To perform general autonomous tasks.",
            domain=topics if topics else ["general"],
            role=role,
            keywords=topics
        )

        # 3. Shakti (Capabilities) - Detected language
        shakti = Shakti(
            tools=[],
            models=[] # Hard to detect without code analysis
        )

        # 4. Ahvana (Invocation) - Placeholder
        ahvana = Ahvana(
            input_schema={"type": "object", "json_schema": {}}
        )

        # 5. Samvada etc. - Defaults
        samvada = Samvada()
        parinama = Parinama(output_schema={})
        maryada = Maryada()
        sakshi = Sakshi()

        return AgamaContract(
            agama_version="1.0",
            sattva=sattva,
            sankalpa=sankalpa,
            shakti=shakti,
            ahvana=ahvana,
            samvada=samvada,
            parinama=parinama,
            maryada=maryada,
            sakshi=sakshi
        )
