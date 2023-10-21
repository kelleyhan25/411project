import base64
import requests
import json
import random

class SpotifyMoodAnalyzer:
    def __init__(self):
        self.client_id = '19048f88d8964d4dbefc706422ed3c88'
        self.client_secret = '4cedada0ae054036ac6bd207cb4fff28'

    def _get_access_token(self):
        token_url = 'https://accounts.spotify.com/api/token'
        client_creds = f'{self.client_id}:{self.client_secret}'
        client_creds_b64 = base64.b64encode(client_creds.encode()).decode()
        token_data = {'grant_type': 'client_credentials'}
        token_headers = {'Authorization': f'Basic {client_creds_b64}'}
        token_response = requests.post(token_url, data=token_data, headers=token_headers)
        token_json = token_response.json()
        return token_json.get('access_token')

    def search_tracks_by_mood(self, mood_query, search_type='track'):
        access_token = self._get_access_token()
        search_url = 'https://api.spotify.com/v1/search'
        search_headers = {'Authorization': f'Bearer {access_token}'}
        search_params = {'q': mood_query, 'type': search_type}
        search_response = requests.get(search_url, headers=search_headers, params=search_params)
        search_results = search_response.json()
        return search_results

    def display_random_track(self, search_results):
        if 'tracks' in search_results and 'items' in search_results['tracks']:
            tracks = search_results['tracks']['items']
            if tracks:
                random_track = random.choice(tracks)
                track_name = random_track['name']
                artists = [artist['name'] for artist in random_track['artists']]
                album_name = random_track['album']['name']
                preview_url = random_track.get('preview_url', 'No preview available')
                print("Random Track:")
                print(f"Track Name: {track_name}")
                print(f"Artists: {', '.join(artists)}")
                print(f"Album: {album_name}")
                print(f"Preview URL: {preview_url}")
            else:
                print("No tracks found for the given mood query.")

# CALL THIS FUNCTION USING:
mood_query = 'Sad'  
mood_analyzer = SpotifyMoodAnalyzer()
search_results = mood_analyzer.search_tracks_by_mood(mood_query)
mood_analyzer.display_random_track(search_results)

