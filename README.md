# SEG3125 Project 1 - Cat Cafe

## Personal Information

| Key            | Value         |
|----------------|---------------|
| Name           | ***REMOVED*** |
| Student Number | ***REMOVED***     |
| Report Title   | Cat Cafe      |

## Previous Experience and Learning Resources

I do have some experience on JavaScript, but I don't have much frontend development experience before. UI design is
almost a start-from-scratch thing for me.

For tutorial material, I was mainly reading about official documentations. For example, Mozilla Developer Network (MDN)
docs are a quality source as a frontend development reference, which contains the numerous entries and examples of the
latest standard of HTML/CSS/JavaScript. Official site themselves, like Bootstrap and jQuery, serves as a good reference
for corresponding frameworks.

When I encounter a problem, I usually go to Stack Overflow, which has most of the answers to my confusion, or I would
Google the problem and find the wanted answer.

## Business Service Type

I chose the website to be an online cat cafe booking portal.
It mostly provides entertainment services for the public domain.

## Inspiration Sites

* [Uber Eats](https://www.ubereats.com/)
* [Feline Cafe Ottawa](https://felinecafeottawa.com/)
* [Airbnb](https://www.airbnb.ca/)

## Original Mockups

* https://seg3125-summer-2022-project-1.pages.dev/mockup/

## Modifications and Improvements

I kept most of the UI design in the mockup. There are a few elements that were changed:

* The buttons are all designed with rounded corners for better visual effect.
* There are feedbacks that pointed out that the layout for the lists are too compact, i.e., the lists on the "Visit a
  Lounge" and "Meet our Stars!" pages, so I added white space between them.
* Some comments also pointed out that the left region (with large portion of white space）and lists are not balanced.
  The left part seems too empty and the right part (contains lists) has too much information. I adjusted the occupation
  ratio between the two parts and relieved the sense of unbalanced layout.
* I moved out the booking dialog as a separate page, as the background of the previous design would have too much
  information.
* For the index page, I changed the image to be the background image, rather than on the right side, and I added a light
  opaque filter for the navigation bar, in order to enhance readability,

## Adopted Goal from Peers

1. Goal: Account based service for regulars
    * There are sign-in and sign-up buttons that are native for accounts. But since this is a serverless frontend page,
      I am not able to realize the functionality of account management.
2. Goal: Content management for lounge owners
    * The content management functionality can be solved by extending the account domain: not only the user would have
      an account, but also the lounge owners will have their accounts, which can be used for managing online contents.

## Link to Web Page

* https://seg3125-summer-2022-project-1.pages.dev/

## Link to Code Base

* https://github.com/uOttawa-Collabs/SEG3125-Summer-2022-Project-1

## Comments

1. I particularly designed and reviewed all the font colors and sizes for **readability**. All the texts are of adequate
   contrast with the background and large enough, so they can be easily read.
2. The core design principle is **simplicity**. For each page, I only preserve minimum number of visual elements,
   without losing aesthetic requirement. Thus, the pages would provide user a relaxed and pleasant reading experience.
3. The progress bar with step indicator is employed in the booking page. I believe the progress bar will well-fit into
   the booking process, which is completely linear.
4. Various optimization for user experience is carried out. For example. when a user books a lounge and goes back and
   forth between the steps, the pages respond swiftly and previous filled information won't lose. Before the order is
   completed,
   the page will prompt a message to get confirmation from the user before the user leaves, which will largely prevent
   accident closure of the page and input data loss.

# Appendix

Three personas that I provided in my feedbacks:

1. Private Chef/Event Catering/Cooking Lesson
    * Name: Kate
    * Intrinsic: 25 years old, has a family with two children.
    * Relation to domain: Kate sometimes book a private chef for his children's birthday parties.
2. Barber shop
    * Name: Harry
    * Intrinsic: 20 years old, university student, go for a hair cut every two months.
    * Relation to domain: Harry will cut his hair on regular basis.
    * Future functionalities: Regular customer may have monthly pass and can use their rewards points to deduct total
      cost.
3. Animal Hospital
    * Name: Peter
    * Intrinsic: 40 years old, owns 3 dogs.
    * Relation to domain: Peter will go to a pet hospital when his dogs are sick or need care.
    * Future functionalities: The customer could book an appointment for multiple pets in one transaction.
