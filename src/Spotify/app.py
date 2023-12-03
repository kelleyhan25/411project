from flask import Flask, request, jsonify
from flask_cors import CORS
from spotifyapi.py import SpotifyMoodAnalyzer

app = Flask(__name__)
CORS(app)

@app.route('/api/search_tracks', methods=['POST'])
def search_tracks():
    data = request.get_json()
    mood_query = data.get('mood_query', 'Happy')

    try:
        mood_analyzer = SpotifyMoodAnalyzer()
        search_results = mood_analyzer.search_tracks_by_mood(mood_query)
        return jsonify(search_results), 200
    except Exception as e:
        print(f"Error searching tracks: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(port=5000)
