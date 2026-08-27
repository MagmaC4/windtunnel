import requests
from bs4 import BeautifulSoup


def scrape():
    url = 'https://www.enet.umn.edu/auto-generated/pressure/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    print("Entire Document")
    print(soup.prettify())

    # title = soup.select_one('h1').text
    # print(f"Title: {title}\n")

if __name__ == '__main__':
    scrape()