import requests
from bs4 import BeautifulSoup


def scrape():

    url = 'www.example.com'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    # title = soup.select_one('h1').text
    # print(f"Title: {title}\n")
    print("Entire Document")
    print(soup.prettify())



if __name__ == '__main__':
    scrape()