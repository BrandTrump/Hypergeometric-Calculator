# Hypergeometric-Calculator

This application is a tool that provides detailed probability information for specifically the Yu-Gi-Oh! Card Game. Paraphrased from wikipedia in simpler terms-the hypergeometric distribution is a way to figure out the chance of getting something you want when you pick a certain number of things from a group without putting them back. The binomial distribution is similar, but you put the things back after each pick.

# Features
The following are the main functions of the tool that are to be/are achieved.

- Allows users to upload a .ydk file (file containing full decklist information that can be exported through commonly used simulators such as EDOPro and YGO OMEGA).
- Gain probability of every card in the deck based on how many copies present in the deck. 
- Gain the probability of drawing a specified hand of the user's choice. For example, the chance of drawing 2x Pot of Greed and 1x Graceful Charity in an opening hand of 5 cards.
- Provide basic card information upon hovering or selecting derived from the YGOProDeck Database API.
- Allow for grouping capabilities such that a user can choose to consider two different cards as essentially the same card. An example of this could be the following... Find the chance of opening one of your 4 copies of Dragon Ravine (Terraforming is basically an extra copy of Ravine).

# Goals
These are the goals that the developers of this tool wish to gain/gained throughout the building of this application.

- (Kooshan) Gain better understanding of how to deploy a web application while integrating logic of the backend with the front end.
- (Kooshan) Develop a fully functional application that others can use and provide feedback to further improve.

References:
https://en.wikipedia.org/wiki/Hypergeometric_distribution
https://www.yugioh.party/
https://ygoprodeck.com/api-guide/
