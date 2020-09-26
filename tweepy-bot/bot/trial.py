import tweepy
import schedule
import time
import random
from vocab import daftar
def tweet():
    # Authenticate to Twitter
    auth = tweepy.OAuthHandler("D8EppgpyeOsj0SjvAW9nkP3Tv", "JZhSU1DhUB6C6UeZ6vHfsDSUeBs7iEAYIJOXYjEzGA5AyTM0Ky")
    auth.set_access_token("1088568538757885952-GHyowfaiMF8JOFQT4Io9xJC3PTKPCW", "xP5FZzzJkevialVPxraDr7WqpQbaRyynSodCsyUVBlmJl")

    # Create API object
    api = tweepy.API(auth)
    i = (random.choice(daftar))
    api.update_status(str(i))
    #print(str(i))



schedule.every(4).hours.do(tweet)

while True:
    schedule.run_pending()
    time.sleep(1)
