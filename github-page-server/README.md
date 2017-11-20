# Github page server

This is still under construction and is meant to be a REST API server built on Python/Flask. 

## Sample request

```
GET /api/contributions?startDate=2014-11-11&endDate=2014-11-14
```

## Sample response

```
[
  {"date": "2014-11-11", "contribution": 0.1},
  {"date": "2014-11-12", "contribution": 0},
  {"date": "2014-11-13", "contribution": 0.9},
  {"date": "2014-11-14", "contribution": 1.0},
]
```
