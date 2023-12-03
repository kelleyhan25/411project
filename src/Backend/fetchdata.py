from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/get_quote', methods=['GET'])
def get_quote():
    limit = request.args.get('limit', default=3, type=int)
    api_url = f'https://api.api-ninjas.com/v1/facts?limit={limit}'
    headers = {'X-Api-Key': 'sk+qS/Qh+8HALOaX4nvkCw==1nnmT6AUki2zhTzK'}
    response = requests.get(api_url, headers=headers)

    print('API URL:', api_url)
    print('Response Status Code:', response.status_code)
    print('Response Text:', response.text)

    if response.status_code == requests.codes.ok:
        data = response.json()

        # Check if the response is a list
        if isinstance(data, list) and data:
            # Use the first item in the list
            quote = data[0].get('fact', 'No fact available')
        elif 'facts' in data:
            # Assuming the response has a 'facts' key
            quote = data['facts'][0].get('fact', 'No fact available')
        else:
            quote = 'No fact available'
        
        return jsonify({'quote': quote})
    else:
        return jsonify({'error': f"Error: {response.status_code} - {response.text}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
