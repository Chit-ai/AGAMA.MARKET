import docker
import time
import logging

logger = logging.getLogger(__name__)

class ExecutionService:
    def __init__(self):
        try:
            # Connect to the local Docker daemon
            self.client = docker.from_env()
        except Exception as e:
            logger.error(f"Failed to connect to Docker daemon: {e}")
            self.client = None

    def execute_code(self, code: str, language: str = "python") -> dict:
        if not self.client:
            return {"error": "Sandbox environment unavailable (Docker not connected)", "exit_code": 1}

        # Select image based on language
        image = "python:3.11-alpine" if language == "python" else "alpine:latest"
        
        # Prepare the container
        try:
            container = self.client.containers.run(
                image,
                command=["python", "-c", code],
                detach=True,
                mem_limit="128m",  # Limit memory to 128MB
                network_disabled=True, # Disable network for security
                cpu_quota=50000, # Limit CPU usage
            )
            
            # Wait for result with timeout
            try:
                result = container.wait(timeout=10)
                logs = container.logs().decode("utf-8")
                exit_code = result.get('StatusCode', 1)
            except Exception as e: # Timeout or other error
                container.kill()
                return {"error": f"Execution timed out or failed: {str(e)}", "exit_code": 1}
            finally:
                container.remove(force=True)

            return {
                "output": logs,
                "exit_code": exit_code
            }

        except Exception as e:
            return {"error": str(e), "exit_code": 1}
