---
name: "GPP Hack4Good, garbage segregation classifier"
verb: "Rate a neighbourhood's waste segregation"
type: "Hackathon"
status: "shipped"
period: "April 2020"
summary: "Team lead for the Hack4Good hackathon entry at KC College of Engineering: a garbage-segregation image classifier built on the TensorFlow Object Detection API, served through a Flask app that rates a community on how well it sorts its waste."
summaryShort: "Hackathon team lead: a garbage-segregation image classifier on TensorFlow, served through a Flask app."
problem: "The hackathon brief was the Garbage Profiling Problem: capture images at local garbage collection points and analyse them to rate a community on waste segregation, so civic bodies can see exactly where enforcement is needed."
architecture: "TensorFlow Object Detection API (1.15) for the classifier, Flask for the web service, with a live_inference.py path that takes a video stream rather than single uploads. Models, static assets, and templates were kept in the standard TensorFlow research layout."
implementation: "Team lead for a three-person team. Set up the Object Detection API and its dependencies, wired the model into the Flask app, and shipped a working prototype at the end of the event with a demo video."
results: "Working prototype delivered on the day, with a recorded demo video and a public repository. The login was left open for the hackathon build: any id and password would work."
stack:
  - "Python 3.7"
  - "TensorFlow 1.15"
  - "TensorFlow Object Detection API"
  - "Flask"
  - "Computer Vision"
tags:
  - "Hackathon"
  - "Computer Vision"
  - "TensorFlow"
  - "Team Lead"
links:
  - label: "View on GitHub"
    href: "https://github.com/i-ankitkumar/GPP_Hack4Good"
    external: true
  - label: "Demo video"
    href: "https://www.youtube.com/watch?v=6Dtl8uYUG4U"
    external: true
featured: false
order: 60
confirm: false
---
