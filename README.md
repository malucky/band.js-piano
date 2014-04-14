band.js-piano
=============

Interface for making Bandjs JSON

##Overview:
This is a user interface to create music using Bandjs [https://github.com/meenie/band.js](https://github.com/meenie/band.js).
Currently only support a single instrument that defaults to piano and tempo: 4/4.

##Instruction:
1) Click on a piano key or a combination of keys to select the notes. 
2) Press one of the following keys on your keyboard to indicate the note(s) duration:
  1: 'whole',
  2: 'half',
  4: 'quarter',
  8: 'eighth'
3) Add the selected note(s) and duration to the song by clicking the 'add' button or pressing 'a' on your keyboard
4) Repeat the steps above to make a song.
5) Click the 'play' button any time to listen to the song
6) Click 'get json' to get the json file

##Future features:
-Interface to navigate back to sections of the song and make changes
-Support multiple instruments, tempo, and other Bandjs defined options