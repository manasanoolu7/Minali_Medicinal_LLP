from flask import Flask, render_template,url_for,jsonify
from flask import Flask, render_template, request, redirect, url_for, flash, session


import random
import os
import openai

openai.api_key = '' 

app = Flask(__name__)






# Database Model for User




@app.route('/index')
def index():
    bg_image_url = url_for('static', filename='images/bg2.avif')
    return render_template('minali_flask.html', bg_image_url=bg_image_url)
    

@app.route('/login',methods=['GET', 'POST'])  # This creates a route for the registration page
def login():
    if request.method == 'POST':
        # contact = request.form['contact']
        # otp = request.form['otp']

        data = request.json
        contact = data.get('contact')
        print(data,contact)
        #user = User.query.filter_by(contact=contact).first()
        if contact:
            otp = random.randint(100000, 999999)
            otp = otp  # Store OTP in memory (use a database in production)
            
            
        
            return jsonify({'message': 'OTP sent successfully!'})
        else:
            return jsonify({'message': 'Contact number not found!'}), 404
        # if user and user.otp == int(otp):
        #     flash('Login successful!', 'success')
        #     return redirect(url_for('index'))
        # else:
        #     flash('Invalid OTP. Please try again.', 'danger')
    return render_template('login.html')  # This renders the register.html template

@app.route('/register',methods=['GET','POST'])  # This creates a route for the registration page
def register():

    if request.method == 'POST':
        first_name = request.form['firstName']  
        
        last_name = request.form['lastName']
        age = request.form['age']
        region = request.form['region']
        soil_type = request.form['soilType']
        water_source = request.form['waterSource']
        irrigation_type = request.form['irrigationType']
        crop_type = request.form['cropType']
        contact = request.form['contactDetails']

        # Save user details in the database
      

        
        #db.session.commit()
        
        

        # # Print the saved data in the console for verification
        # print("User saved in database:")
        # print(f"First Name: {user.first_name}, Last Name: {user.last_name}, Age: {user.age}")
        # print(f"Region: {user.region}, Soil Type: {user.soil_type}")
        # print(f"Water Source: {user.water_source}, Irrigation Type: {user.irrigation_type}")
        # print(f"Crop Type: {user.crop_type}, Contact: {user.contact}")

        
         

        
        

        # msg = Message('Your OTP', sender='manasadevinoolu@gmail.com', recipients=[contact])
        # msg.body = f"Your OTP is {otp}."
        

        flash('Registration successful! Please check your contact for OTP.', 'success')
        #return f"OTP sent to {contact}!"
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_input = data.get('message')

    if user_input:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",  # Use the appropriate model
            messages=[
                {"role": "user", "content": user_input}
            ]
        )
        bot_response = response.choices[0].message.content
        return jsonify({'response': bot_response})

    return jsonify({'error': 'No message provided'}), 400

@app.route('/rnd')
def rnd():
    return render_template('rnd.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/services')
def services():
    return render_template('services.html')


@app.route('/aboutus')
def aboutus():
    return render_template('aboutus.html')


if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all()  # Creates the SQLite database and tables if they don't exist
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
