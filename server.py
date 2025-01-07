from flask import Flask, jsonify, render_template
import pandas as pd
df=pd.read_csv("Netflix Userbase.csv")
app=Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-enrollment-trends')
def get_enrollment_trends():
    enrollment_data = df.groupby('Monthly Revenue')['Country'].count().reset_index()
    enrollment_data.columns = ['Country', 'Monthly Revenue']
    return jsonify(enrollment_data.to_dict(orient='records'))

@app.route('/get-datachart')
def get_datachart():
    classes =df["Subscription Type"].value_counts().index   #unique
    values =df["Monthly Revenue"].values
    data=[]
    for i in range (len(classes)):
        data.append({"class":classes[i],"value":int(values[i])})
    return jsonify(data)

@app.route('/get-datachart2')
def get_datachart2():
    classes = df["Device"].value_counts().index[:10]
    values = df["Device"].value_counts().values[:10] 
    data = []
    for i in range(len(classes)):
        data.append({'class': classes[i], 'value': int(values[i])})
    return jsonify(data)

@app.route('/get-datachart4')
def get_datachart4():
    classes =df["Gender"].value_counts().index[:10]
    values =df["Country"].value_counts().values[:10]
    data=[]
    for i in range (len(classes)):
        data.append({"class":classes[i],"value":int(values[i])})

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True) 