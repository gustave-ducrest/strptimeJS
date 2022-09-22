# strptimeJS
strptime function and helper functions for javascript


The Date class in Javascript can be hard to work with, and lacks a strptime function like in Python. 

This repo includes a function that creates Date objects using a string input and format input.

While, the Date object constructor doesn't use days of the week, I've included a 'day of week' input, which is particularly helpful if you are using days of the week in your code and are date-agnostic.
(Ie a scheduling app where you are planning out your week)
When a day is specified but not a date, a Date object with the first occurence of the day in the specified month (defaults to January) is created.

A format string is required in order to make sense of space (or comma, colon, slash)-separated inputs, and so that non-specified inputs can be defaulted.

Examples and usage: 

strptime("11 9 2022", "%m %d %Y")
//returns Date object for November 9 2022

strptime("11 22", "%H %M")
strptime("11:22", "%H %M")
//both return Date object for Jan 1 1899 11:22 am

strptime("Mon 2022", "%a %m %Y")
//returns Date object for first Monday of 2022

strptime("Mon 5 2022", "%a %m %Y")
//returns Date object for first Monday of May 2022 


