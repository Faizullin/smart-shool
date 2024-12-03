import math
import random
import re
from bs4 import BeautifulSoup
import pandas as pd
import json

# Function to read Excel data and save it to JSON
def excel_to_json(excel_file, json_file):
    # Read the Excel file into a DataFrame
    df = pd.read_excel(excel_file)
    
    # Extract relevant columns (email and username)
    data = df[['First name', 'Surname' , "ID number"]].to_dict(orient='records')
    # print(data)
    # # Save data as JSON to the specified file
    output_data = []
    with open(json_file, 'w') as jsonf:
        for i in data:
            output_data.append(
                {
                    "email": i["ID number"],
                    "first_name": i["First name"],
                    "last_name": i["Surname"],
                    "username": f"{i["First name"].lower()}.{ i["Surname"].lower()}",
                }
            )
        json.dump(output_data, jsonf, indent=4)

    print(f"Data successfully saved to {json_file}")

def parse_questions(raw_text):
    # Regex pattern to capture questions, options, and answers
    pattern = r"(\d+)\.(.*?)(Ответ:\s*([a-d]\))\s*(.*?))"
    
    # Find all matches for questions, options, and answers
    questions = []
    matches = re.findall(pattern, raw_text, re.DOTALL)
    
    for i, match in enumerate(matches):
        question_number = match[0]
        question_text = match[1].strip()
        answer = match[3]
        answer_text = match[4].strip()
        
        # Extract options (a, b, c, d)
        options = re.findall(r"([a-d]\))\s*([^\n]+)", match[1])
        options = [option[1].strip() for option in options]
        
        # Create question dict
        question_dict = {
            "iundex": i,
            "question": question_text,
            "options": options,
            "answer": f"{answer} {answer_text}"
        }
        
        questions.append(question_dict)
    
    return questions
# with open("./data/input_quiz.txt", "r", encoding="utf-8") as f:
#     data = parse_questions(f.read())
#     print(data)
# with open("./output/quiz_data.json", "w", encoding='utf-8') as fwrite:
#     json.dump(data, fwrite, ensure_ascii=False)


def generate_random_results():
    with open("../backend/seeding/output/users1.json", "r") as f:
        data1 = json.load(f)
    with open("../backend/seeding/output/users2.json", "r") as f:
        data2 = json.load(f)
    data = data1 + data2
    data = [i for i in data if type(i["email"]) is str]
    results = []
    for user in data[:300]:
        result = random.randint(70,100)
        results.append(result)
    for user in data[300:]:
        result = random.randint(30,70)
        results.append(result)
    print(sum(results) / len(results))
    print(len(data), len(results))
print(generate_random_results())