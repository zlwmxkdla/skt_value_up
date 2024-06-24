from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 모델과 토크나이저 로드
# beomi/Llama-3-Open-Ko-8B
model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if user_input:
        # 사용자 입력을 토큰화
        inputs = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors='pt')
        # 모델로부터 응답 생성
        outputs = model.generate(inputs, max_length=1000, pad_token_id=tokenizer.eos_token_id)
        response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return jsonify({'response': response_text})
    return jsonify({'response': 'Error: No message received'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
