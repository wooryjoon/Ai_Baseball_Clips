# ORM과는 다르다...

class Pitcher:
    def __init__(self, id, name, position, team_name):
        self.id = id
        self.name = name
        self.position = position
        self.team_name = team_name

class Hitter:
    def __init__(self, id, name, position, team_name):
        self.id = id
        self.name = name
        self.position = position
        self.team_name = team_name