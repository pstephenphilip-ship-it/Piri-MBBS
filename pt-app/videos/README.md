# Exercise videos

Put your demo videos in this folder, then point the exercise at it in
`js/data/exercises.js`:

```js
{
  id: 'goblet-squat', name: 'Goblet Squat', ...
  video: 'videos/goblet-squat.mp4',
  poster: 'videos/goblet-squat.jpg', // optional still image
},
```

Or use a YouTube / Vimeo link instead of a file:

```js
video: 'https://youtu.be/XXXXXXXXXXX',
```

Tips: MP4 (H.264) plays everywhere. Keep clips short (10–30 s) and
compress them (720p is plenty on a phone) so the app stays fast.
