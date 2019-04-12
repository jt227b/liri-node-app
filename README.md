# Liri Bot

 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Website
https://jt227b.github.io/liri-node-app/.

## Getting Started

Using your terminal or Git Bash LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

### Prerequisites

To retrieve the data that will power this app, you'll need to send requests using the axios package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

```
Node-Spotify-API

Axios

Moment

DotEnv
```

## Terminal Walk-Through

To search for any Bands in Town, Spotify Songs and OMDB Movies you'll:

* node liri.js concert-this

```
What would you like to search?

Enter LETTER or term for ONE of the options below:

c - concert-this,

s - spotify-this-song,

m - movie-this,

r - do-what-I-say

```
* Type Letter C
```
Please enter name of an artist or a band
```
* The Killers
```
The Killers

1- United States
-----------------------------------
Venue Name: Beale Street Music Festival
Venue Location: Memphis, TN
Event Date: 05/05/2019

2- United States
-----------------------------------
Venue Name: Walmart Arkansas Music Pavilion
Venue Location: Rogers, AR
Event Date: 05/06/2019

3- United States
-----------------------------------
Venue Name: The Zoo Amphitheatre
Venue Location: Oklahoma City, OK
Event Date: 05/07/2019

4- United States
-----------------------------------
Venue Name: The Bomb Factory
Venue Location: Dallas, TX
Event Date: 05/09/2019

5- United States
-----------------------------------
Venue Name: AT&T Stadium
Venue Location: Arlington, TX
Event Date: 05/10/2019

```
## Screenshots

1. node liri.js concert-this
<img width="287" alt="ConcertThis" src="https://user-images.githubusercontent.com/46248532/56013052-b1e5b200-5cb4-11e9-954b-18f43a246f17.png">

2. node liri.js spotify-this-song
<img width="429" alt="SpotifyThisSong" src="https://user-images.githubusercontent.com/46248532/56013150-0ab54a80-5cb5-11e9-874c-3567516f298e.png">

3. node liri.js movie-this
<img width="714" alt="MoiveThis" src="https://user-images.githubusercontent.com/46248532/56013154-0ee16800-5cb5-11e9-8e3a-f0bb69c59e8d.png">

## Acknowledgments

* Huge Thanks to Nina Calderone (NiBeCa) who took time off to help both Onix Castro (onix-xccc) and Myself with issues we had when running our codes. We coordinated to join in a Tech room using Zoom to share screens and correct errors consoled out. 



