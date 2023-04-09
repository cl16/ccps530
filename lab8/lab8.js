var express = require('express');
var app = express();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

app.use(express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

var book_list = [
    {
        'title': 'Nineteen Eighty-Four',
        'author': 'George Orwell',
        'publisher': 'BookPublisher',
        'date': '1949',
        'website': '1984.com',
    },
    {
        'title': 'Snowcrash',
        'author': 'Neil Stephens',
        'publisher': 'Publisher123',
        'date': '1997',
        'website': 'www.snowcrash.com',
    },
    {
        'title': 'The Great Gatsby',
        'author': 'Scott Fitzgerald',
        'publisher': 'Pushlisher456',
        'date': '1950',
        'website': 'greatgatsby.com',
    },
]

function get_list() {
    var html = '<div>List of books:<div>'
    for (var i = 0; i < book_list.length; i++) {
        title_div = '<div>Title: ' + book_list[i].title + '</div>';
        author_div = '<div>Author: ' + book_list[i].author + '</div>';
        publisher_div = '<div>Publisher: ' + book_list[i].publisher + '</div>';
        date_div = '<div>Date: ' + book_list[i].date + '</div>';
        website_div = '<div>Website: ' + book_list[i].website + '</div>';
        book_html = '<p>' + title_div + author_div + publisher_div + date_div + website_div + '</p>';
        html = html + book_html;
    }
    return html;
}

/* Server functions: 

app.get('/bookinventory', function(req, res) {
    html = get_list();
    res.send(html)
});

app.get('/bookinventory/add/:title/:author/:publisher/:date/:website', function(req, res) {
    var params = req.params;
    console.log(params);
    book_list.push(params);
    res.send('<p>Book added!</p>' + get_list());
})

*/

/*`mongodb+srv://${username}:${password}@cluster0.3axaotl.mongodb.net/?retryWrites=true&w=majority?directConnection=true`;*/

let uri = `mongodb+srv://clacoursiere:BQwQG6xQNAEwDPS1@cluster0.3axaotl.mongodb.net/?retryWrites=true&w=majority?directConnection=true`;
 
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log('It connected!!!');
        const database = client.db("books");
        database.collection("bookinventory").insertMany(book_list, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

/*app.listen(3000);*/
