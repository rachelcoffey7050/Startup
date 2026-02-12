# CS 260 Notes

[Lecture Notes](lecturenotes.md)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My Publlic elastic IP address is: 3.94.41.68
This is the command to ssh into the server. Remember to be in the correct directory. rache@RachelPC MINGW64 /c/cs260
$ ssh -i rachel-cs260-key.pem ubuntu@3.94.41.68

The domain for my website is [storypolls.click](http://storypolls.click)

## Caddy

After getting stuck on caddy for more than an hour because of some mysterious timeout issue that I, copilot, and a TA were all helpless to solve, I got a new EC2 instance that was micro instead of nano. That resolved the problem. Unfortunately, it is twice as expensive, but at least it works lol.

## HTML

The hardest part was figuring what tags would be best for later implementation of the features we haven't learned about yet. I think my code looks okay, but I may have to edit it once I understand exactly what I'll be doing in the other steps of this project.

It's difficult to resist the temptation to make everything as pretty as possible, but I have to trust it will be better to wait for the next step.

## CSS

It took a while to get everything lookign the way I wanted. Flex is very useful for getting everything to line up correctly. I created a custom button.

There are still some things that I wish I could change that would take too much time. For example, changing the look of the button on the form radio items would mean hiding it and creating an entire new one.
I attempted to do this, but it wasn't reacting like it should have, so eventually I gave up. That may be something to return to. I'm not entirely satisfied with how it looks, but it's good enough.
I also didn't have time to look into animations, because I might want the meter to dynamically grow when vote is pressed. However, I think I'll wait to do that until after I've done the react portion.

Some things that are easy to get mixed up: 
- Justify content is what controls where on the page the item is. If you use "space around" it will add a lot of extra space which may not look good.
- Margins: control the space outside of the object
- padding: controls the space between children and edges of the object

Making custom properties made a lot of things easier so if I want to change the colors it is simple.

## React Part 1: Routing

This portion was frusterating! The simon part went smoothly, but I ran into problems when I tried it for myself. 
The CSS I had written to apply to a specifc page became globally applied. It took me a while to understand that I had to switch every instance of _main_ to 
a tag which I added to the main in each jsx file. Then, preface each section in the css file with that same tag so it would only apply to the page I wanted it to.

There were a couple of confusing spots in the instructions where I wasn't sure which file I was supposed to be working in, but I think it turned out correct!
It's a shame that with the new file structure, the background image takes a few minutes to load when I pull up the page.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
