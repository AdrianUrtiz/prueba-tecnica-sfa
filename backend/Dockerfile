# Base Image
FROM python:3.11-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Make directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .
COPY entrypoint.sh /app/entrypoint.sh

# Expose port
EXPOSE 8000

# Run server
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]
