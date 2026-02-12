
const quotes = [
{ text: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson'},
{text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds'},
{text: 'The most disastrous thing you can ever learn is your first programming language.', author: 'Alan Kay'},
{text: 'Simplicity is prerequisite for reliability.', author: 'Edsger Dijkstra'},
{text: 'First, solve the problem. Then, write the code.', author: 'John Johnson'},
{text: 'Any sufficiently advanced technology is indistinguishable from magic.', author: 'Arthur C. Clarke'},
{text: 'The function of good software is to make the complex appear simple.', author: 'Grady Booch'},
{text: 'Premature optimization is the root of all evil.', author: 'Donald Knuth'},
{text: 'Computers are good at following instructions, but not at reading your mind.', author: 'Donald Knuth'},
{text: 'The only way to learn a new programming language is by writing programs in it.', author: 'Dennis Ritchie'}
]

export function getQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex]
}