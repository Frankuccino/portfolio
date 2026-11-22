---
title: "Descriptive Statistics: Two Ways to Summarise a Distribution"
date: 2026-11-21
excerpt: "I finished the six warmup videos for Stage 1 of the statistics foundations and filled four pages of notes. The thread through all of them: describe a distribution by its centre and spread, or by its ranks, and the first only works if the data cooperates."
tags: [Statistics, Data Science, Learning]
---

I finished the six warmup videos for Stage 1 of the statistics foundations today, and I filled four pages of notes. All StatQuest:

- Histograms, Clearly Explained
- The Main Ideas behind Probability Distributions
- The Normal Distribution, Clearly Explained
- Statistics Fundamentals: The Mean, Variance and Standard Deviation
- Boxplots, Clearly Explained
- Quantiles and Percentiles, Clearly Explained

This is the post I would have wanted before I started. Not a summary of the videos. The one idea that connects all six, the symbols I kept mixing up, and the two details that only made sense once I wrote them down.

## Why this playlist comes before the book

These six videos are the warmup for *Practical Statistics for Data Scientists*, the first book in Stage 1 on the [books page](/books#statistics). The stage carries the same instruction: watch the six warmup videos first, then read chapter by chapter.

The reason is that the book assumes the vocabulary. It defines a term once and then uses it for the next three hundred pages, so a word you did not settle in the first hour becomes a tax on every chapter after it. The note against the book on the site says why: everything downstream assumes this vocabulary, from evaluation metrics to A/B tests to confidence intervals on a model's accuracy.

Read without the playlist and the opening chapters read as a list of formulas you are expected to accept, which is where the book stops being readable. Watch first and the same pages read as practice rather than translation. You already know what a histogram is for and what the standard deviation measures, so the book can spend its effort on the part that is actually hard: when the assumption behind a method fails, and what to use instead.

The videos give you the words. The book gives you the judgement.

## The one idea

Every video in the set answers the same question: how do you describe a distribution with a handful of numbers? And there are only two families of answer.

**The centre and spread route.** Mean and standard deviation, or z-scores. Cheap, exact, and it assumes the shape is roughly a bell curve. When it is, two numbers tell you almost everything.

**The rank route.** Median, quartiles, IQR, percentiles. Slightly less informative when the data is a clean bell curve, and it does not care what the shape is. An outlier that drags the mean around barely moves the median.

Choosing between them is the whole skill. The videos keep coming back to the same test: look at the shape first, then pick.

## Histograms: the shape comes first

A histogram is raw data grouped into bins. That is the whole mechanism, and it is why the first video exists. A list of 200 numbers tells you nothing, and the same 200 numbers drawn as 12 bars tells you the shape immediately.

The payoff is that a normal curve and a skewed distribution stop looking alike. Once you can see the skew, the mean is no longer a fair summary of the middle and the z-score route is compromised. That is the practical reason to draw the thing before you compute anything.

## From histograms to distributions

A histogram is a sample. A distribution is the shape underneath it.

Keep splitting the same data into narrower bins and the steps of the histogram get smaller and smoother. Keep collecting more data and the bars stop jumping around from one sample to the next. What is left is a smooth curve, and that curve is the distribution: it says how likely each value is.

The probability connection is the area under the curve. For any range of values, the area between them is the chance that a new measurement lands there, and the total area is 1. That is what lets the normal distribution be drawn as a curve and still be a probability statement rather than a picture.

This is the step the first video is building toward. A histogram is what your data looks like. A distribution is what your data is doing, and the shape is what decides whether the mean and standard deviation are honest summaries or convenient ones. The normal curve is the most famous of these shapes, and the one those two numbers describe best.

## Mean, variance, standard deviation

Two symbols carry all of what follows. **μ**, said "mu", is the population mean. **σ**, said "sigma", is the population standard deviation. The z-score is `z = (x - μ) / σ`: how many standard deviations a value sits from the mean. Both ingredients have a reason for looking like they do.

```
population variance    σ² = (1 / N) · Σ (xᵢ − μ)²
population std dev     σ = √σ²
z-score                z = (x − μ) / σ
```

**Why the deviations are squared.** The deviations from the mean sum to zero by construction, so adding them up tells you nothing. Values below the mean are negative and they cancel the ones above it. Squaring keeps every deviation as a positive contribution, so a value far from the mean in either direction adds a lot and a value near it adds little.

**Why the square root comes back.** Squaring changes the units. If the data is in centimetres, the variance is in square centimetres, which is not a distance you can plot on the same axis as the data. The standard deviation is the square root of the variance, so it is back in centimetres and directly comparable to the mean.

| Symbol | Says | Name | What it is |
| --- | --- | --- | --- |
| μ | mu | Population mean | The true centre of the whole population |
| x̄ | x bar | Sample mean | The centre of the data you actually have |
| σ² | sigma squared | Population variance | Average squared deviation from μ |
| σ | sigma | Population standard deviation | Square root of the variance, in the data's units |
| s² | s squared | Sample variance | Same idea, from x̄, divided by n − 1 |
| s | s | Sample standard deviation | Square root of the sample variance |

## Population versus sample, and the n − 1

This is the detail I wrote down twice, because the first pass felt like a fudge.

A **parameter** describes a population. A **statistic** describes a sample. **x̄**, said "x bar", is the sample mean, and **s** is the sample standard deviation. We almost never have the population, so we almost always estimate the parameter with a statistic. The videos are careful about the words: **calculating** a population parameter, **estimating** it from a sample. The formulas are nearly identical and the difference matters.

The difference is `n − 1`. When you compute deviations from the sample mean rather than the population mean, they come out systematically too small, because the sample mean is the value that minimises them. It is fitted to the data, so it sits closer to the data than the true mean does. Dividing by `n − 1` instead of `n` inflates the result just enough to cancel that downward bias. That is Bessel's correction, and it is why the sample variance is not the same formula with a different letter.

```
sample variance (Bessel)   s² = (1 / (n − 1)) · Σ (xᵢ − x̄)²
sample std dev             s = √s²
```

## The rank route: boxplots, IQR, quantiles

The boxplot is the alternative when the bell curve assumption fails. A box from the first quartile to the third, a line at the median, and whiskers out to the smallest and largest values that are not outliers. Q1, said "Q one", is the first quartile and Q3, said "Q three", the third. IQR is read as "I Q R".

**The IQR** is `Q3 − Q1`, the spread of the middle half. It ignores the tails entirely, which is the point: an extreme value can be ten times the rest of the data and the IQR will not move.

**Outliers** sit beyond the fences, `Q1 − 1.5 × IQR` below and `Q3 + 1.5 × IQR` above. Anything outside is plotted as its own point rather than being stretched into the whisker.

**Quantiles** split the data into equal sized groups. Quartiles are the four way split, and the median is the two way split, which is the same thing as the 50th percentile. A percentile is a rank: the nth percentile is the value where n percent of the data sits below it. The formula I wrote down is the count of points below the value, divided by the total count, times 100.

The median being the 50th percentile is the useful mental model. It means the two routes agree on the centre and disagree about everything else, which is exactly why you would pick one over the other.

## Mean square, and why it is the baseline for every loss function

The last detail that clicked: the mean of the squared deviations is the smallest possible mean squared error. If you guess one value `v` for every data point, the mean squared error is `(1/n) × Σ(v − x)²`, and it is smallest when `v` is the mean.

That is why the variance uses squared deviations and not absolute ones. Squaring is not just a trick to keep the signs positive. It is the shape of the most common cost function in statistics and machine learning, and the mean is its optimum. Absolute error has its own optimum, the median, which is the other half of the same idea.

## The formula sheet

Everything above in one place, for revision.

```
z-score                    z = (x − μ) / σ
population variance        σ² = (1 / N) · Σ (xᵢ − μ)²
population std dev         σ = √σ²
sample variance (Bessel)   s² = (1 / (n − 1)) · Σ (xᵢ − x̄)²
sample std dev             s = √s²
interquartile range        IQR = Q3 − Q1
lower fence                Q1 − 1.5 · IQR
upper fence                Q3 + 1.5 · IQR
mean squared error         MSE = (1 / n) · Σ (v − x)²
percentile of a value      (count below the value / n) · 100
```

Two of these are worth memorising rather than looking up. The variance squares the deviations so the negative ones cannot cancel the positive ones, then the standard deviation takes the square root to get back to the data's own units. And the sample variance divides by `n − 1` because the sample mean is fitted to the data, which makes the deviations systematically too small.

## What I am taking forward

Four pages of notes, and the thing I would keep is the order: draw the shape, then choose the route. Centre and spread when it is a bell curve, ranks when it is not.

That is the descriptive half of statistics: summarising the data you already hold. The other half is inferential, and that is where p-values and confidence intervals live. They felt like a different subject after six videos about describing data because they are one. Inference is about what a sample lets you claim about a population you do not have, which is the distinction the `n − 1` correction was quietly pointing at.
