import sys
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

text = sys.argv[1]
target = sys.argv[2]

prompt = f"""
Translate the following text into {target}.
Preserve institutional tone.
Do not modify structure.
Text:
{text}
"""

response = openai.ChatCompletion.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],
    temperature=0
)

print(response.choices[0].message["content"].strip())