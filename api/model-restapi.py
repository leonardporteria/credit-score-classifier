from flask import Flask, request, jsonify
from joblib import  load


app = Flask(__name__)

loaded_model = load("decision_tree_model.pth")


# Function to preprocess user input
def preprocess_user_input(user_input):
    age = user_input['age']
    gender = user_input['gender']
    income = user_input['income']
    education = user_input['education']
    marital_status = user_input['marital_status']
    num_children = user_input['num_children']
    home_ownership = user_input['home_ownership']
    
    gender = 0 if gender == 'Male' else 1
    education_map = {"high school diploma": 0, "associate's degree": 1, "bachelor's degree": 2, "master's degree": 3, 'doctorate': 4}
    education = education.lower()  
    education = education_map[education]  
    marital_status = 0 if marital_status == 'Single' else 1
    home_ownership = 0 if home_ownership == 'Rented' else 1
    return age, gender, income, education, marital_status, num_children, home_ownership


# Function to predict credit score
def predict_credit_score(model, user_input):
    preprocessed_input = preprocess_user_input(user_input)
    prediction = model.predict([preprocessed_input])[0]
    if prediction == 0:
        return "Low"
    elif prediction == 1:
        return "Average"
    else:
        return "High"


@app.route('/predict', methods=['POST'])
def predict_credit():
    data = request.get_json()
    user_input = data['user_input']
    predicted_credit_score = predict_credit_score(loaded_model, user_input)
    return jsonify({'predicted_credit_score': predicted_credit_score})


if __name__ == '__main__':
    app.run(debug=True)
