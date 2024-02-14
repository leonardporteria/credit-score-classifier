
from joblib import dump
import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

df = pd.read_csv("Credit-Score-Classification-Dataset.csv")


df['Gender'] = df['Gender'].map({'Male': 0, 'Female': 1})
df['Education'] = df['Education'].map({'High School Diploma': 0, "Associate's Degree": 1, "Bachelor's Degree": 2, "Master's Degree": 3, 'Doctorate': 4})
df['Marital Status'] = df['Marital Status'].map({'Single': 0, 'Married': 1})
df['Home Ownership'] = df['Home Ownership'].map({'Rented': 0, 'Owned': 1})
df['Credit Score'] = df['Credit Score'].map({'Low': 0, 'Average': 1, 'High': 2})


df['Gender'] = df['Gender'].astype('category')
df['Education'] = df['Education'].astype('category')
df['Marital Status'] = df['Marital Status'].astype('category')
df['Home Ownership'] = df['Home Ownership'].astype('category')
df['Credit Score'] = df['Credit Score'].astype('category')


# Split the data into features (X) and target variable (y)
X = df.drop('Credit Score', axis=1)
y = df['Credit Score']


# Train test split
X_train, X_test, y_train, y_test = train_test_split(X,y, train_size = 0.8, random_state=13)


model = DecisionTreeClassifier(
    criterion = 'gini',
    splitter = 'best'
)
model.fit(X_train, y_train)

# Specify the file path where you want to save the model
model_path = "decision_tree_model.pth"

# Save the model
dump(model, model_path)


