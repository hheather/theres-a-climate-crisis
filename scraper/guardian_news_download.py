import requests
from bs4 import BeautifulSoup
import re

class GuardianScraper:
    GUARDIAN_URL = 'https://www.theguardian.com'

    def __init__(self, base_url):
        self.base_url = base_url
        self.headers = {"User-Agent": "Mozilla/5.0"}
        self.container_regex = re.compile(r"container-\d{1,2}-[a-zA-Z]+-\d{4}")

    def get_article_titles(self):
        response = requests.get(self.base_url, headers=self.headers)
        if response.status_code != 200:
            print(f"Failed to fetch page: {self.base_url}")
            return []
        
        soup = BeautifulSoup(response.text, 'html.parser')
        containers = soup.find_all(id=self.container_regex)
        titles = []
        
        for container in containers:
            articles = container.find_all('a', attrs={"aria-label": True})
            for article in articles:
                if article.get('href'):
                    title = article['aria-label']
                    titles.append(title)
        return titles
    
    def scrape(self):
        return self.get_article_titles()
