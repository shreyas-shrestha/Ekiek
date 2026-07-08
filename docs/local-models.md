# Local Models

Ekiek routes packets to local runtimes before cloud models.

Supported adapter concepts:

- Ollama at `http://localhost:11434`.
- LM Studio at `http://localhost:1234/v1`.
- llama.cpp server mode.
- Apple MLX local acceleration.
- Optional user cloud key, disabled by default.

Local models can receive local context according to permissions. Cloud models require explicit consent by space, sensitivity, or task.
