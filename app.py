from flask import Flask, request, jsonify, render_template, redirect, url_for
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 모델과 토크나이저 로드
model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/situation')
def situation():
    return render_template('situation.html')

@app.route('/chatting')
def chatting():
    return render_template('chatting.html')

@app.route('/result')
def result():
    return render_template('result.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if user_input:
        inputs = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors='pt')
        outputs = model.generate(inputs, max_length=1000, pad_token_id=tokenizer.eos_token_id)
        response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return jsonify({'response': response_text})
    return jsonify({'response': 'Error: No message received'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
