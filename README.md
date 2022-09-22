# strptimeJS
strptime function and helper functions for javascript


The Date class in Javascript can be hard to work with, and lacks a strptime function like in Python. 

This repo includes a function that creates Date objects using a string input and format input.

While, the Date object constructor doesn't use days of the week, I've included a 'day of week' input, which is particularly helpful if you are using days of the week in your code and are date-agnostic.
(Ie a scheduling app where you are planning out your week)
When a day is specified but not a date, a Date object with the first occurence of the day in the specified month (defaults to January) is created.


