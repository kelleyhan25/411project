from flask import Flask, request, jsonify
from spotifyapi import SpotifyMoodAnalyzer  # Assuming your SpotifyMoodAnalyzer is defined in spotifyapi.py

app = Flask(__name__)
spotify_analyzer = SpotifyMoodAnalyzer()

@app.route('/get_spotify_song', methods=['GET'])
def get_spotify_song():
    mood_query = request.args.get('mood', default='Sad')
    search_results = spotify_analyzer.search_tracks_by_mood(mood_query)
    
    if search_results:
        return jsonify(search_results)
    else:
        return jsonify({'error': 'No tracks found for the given mood query'})

if __name__ == '__main__':
    app.run(debug=True)
