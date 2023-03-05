from firebase_admin import credentials
from firebase_admin import firestore
from datetime import date as dt
import firebase_admin
from lxml import html
import requests
import time

# Use a service account.
cred = credentials.Certificate("s/weather-project.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

cities = {
    "Adana/LTAG": "Turkiye-TR",
    "Adiyaman/LTDY": "Turkiye-TR",
    "Afyon/LTAF": "Turkiye-TR",
    "Agri/LTCB": "Turkiye-TR",
    "Aksaray/LT01": "Turkiye-TR",
    "Amasya/LTT3": "Turkiye-TR",
    "Ankara/LTAD": "Turkiye-TR",
    "Antalya/TU0199": "Turkiye-TR",
    "Ardahan/LT02": "Turkiye-TR",
    "Artvin/LTAT": "Turkiye-TR",
    "Aydin/LT03": "Turkiye-TR",
    "Balikesir/LTBF": "Turkiye-TR",
    "Bartin/LT04": "Turkiye-TR",
    "Batman/LTCJ": "Turkiye-TR",
    "Bayburt/LT05": "Turkiye-TR",
    "Bilecik/LTKY": "Turkiye-TR",
    "Bingol/LTT5": "Turkiye-TR",
    "Bitlis/LT07": "Turkiye-TR",
    "Bolu/LTT1": "Turkiye-TR",
    "Burdur/LT08": "Turkiye-TR",
    "Bursa/LTBU": "Turkiye-TR",
    "Canakkale/LTBH": "Turkiye-TR",
    "Cankiri/LT09": "Turkiye-TR",
    "Corum/LTT2": "Turkiye-TR",
    "Denizli/LT10": "Turkiye-TR",
    "Diyarbakir/LTCC": "Turkiye-TR",
    "Duzce/TU0629": "Turkiye-TR",
    "Edirne/LTEI": "Turkiye-TR",
    "Elazig/LTCA": "Turkiye-TR",
    "Erzincan/LTCD": "Turkiye-TR",
    "Erzurum/LTCE": "Turkiye-TR",
    "Eskisehir/LTES": "Turkiye-TR",
    "Gaziantep/LTGA": "Turkiye-TR",
    "Giresun/LT11": "Turkiye-TR",
    "Gumushane/LT12": "Turkiye-TR",
    "Hakkari/LT13": "Turkiye-TR",
    "Hatay/LTDA": "Turkiye-TR",
    "Igdir/TU0486": "Turkiye-TR",
    "Isparta/LTBM": "Turkiye-TR",
    "Istanbul/LTSI": "Turkiye-TR",
    "Izmir/LTBL": "Turkiye-TR",
    "Kahramanmaras/LT17": "Turkiye-TR",
    "Karabuk/LT18": "Turkiye-TR",
    "Karaman/LT19": "Turkiye-TR",
    "Kars/LTCF": "Turkiye-TR",
    "Kastamonu/LT20": "Turkiye-TR",
    "Kayseri/LTAU": "Turkiye-TR",
    "Kilis/LT23": "Turkiye-TR",
    "Kirikkale/LT21": "Turkiye-TR",
    "Kirklareli/LTKK": "Turkiye-TR",
    "Kirsehir/LT22": "Turkiye-TR",
    "Kocaeli/LTKO": "Turkiye-TR",
    "Konya/LTAN": "Turkiye-TR",
    "Kutahya/LT24": "Turkiye-TR",
    "Malatya/LTMA": "Turkiye-TR",
    "Manisa/LT25": "Turkiye-TR",
    "Mardin/LTT6": "Turkiye-TR",
    "Mersin/LT16": "Turkiye-TR",
    "Mugla/LTT8": "Turkiye-TR",
    "Mus/LTCK": "Turkiye-TR",
    "Nevsehir/LTT0": "Turkiye-TR",
    "Nigde/LTNI": "Turkiye-TR",
    "Ordu/LT26": "Turkiye-TR",
    "Osmaniye/LT27": "Turkiye-TR",
    "Rize/LT28": "Turkiye-TR",
    "Sakarya/LTSK": "Turkiye-TR",
    "Samsun/LTSS": "Turkiye-TR",
    "Sanliurfa/LT30": "Turkiye-TR",
    "Siirt/LT29": "Turkiye-TR",
    "Sinop/LTSP": "Turkiye-TR",
    "Sirnak/TU0265": "Turkiye-TR",
    "Sivas/LTAR": "Turkiye-TR",
    "Tekirdag/LTTK": "Turkiye-TR",
    "Tokat/LTAW": "Turkiye-TR",
    "Trabzon/LTTR": "Turkiye-TR",
    "Tunceli/LT32": "Turkiye-TR",
    "Usak/LTBO": "Turkiye-TR",
    "Van/LTCI": "Turkiye-TR",
    "Yalova/TU0615": "Turkiye-TR",
    "Yozgat/LTYZ": "Turkiye-TR",
    "Zonguldak/LTZO": "Turkiye-TR",
    "New_York/NYC": "USA-US",
    "Barcelona/LEBL": "Spain-ES",
    "Paris/LFPO": "France-FR",
    "Roma/LIRF": "Italy-IT",
    "Moskova/UUEE": "Russia-RU",
}

url_format = "https://www.haberturk.com/havadurumu/"

# to decide and append at the last of format for url parameter in which has @ in the string.

parsed_raw_datas = []
today = dt.today()
today_str = today.strftime("%Y-%m-%d")
document = "{}".format(today_str)

headers = {
    "authority": "www.haberturk.com",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
}


def parse_data(dom_, selector, name_, process):
    unp_data = (
        str(dom_.xpath(selector)[0])
        if name_ != "lengthOfDaily  :  "
        else len(dom_.xpath(selector))
    )
    parsed_data = process(unp_data)
    if type(parsed_data) == str:
        print(name_ + parsed_data)

    return parsed_data


def db_writer(country_dicts, date_=today_str):
    for country_dict in country_dicts:
        db.collection(date_).add(country_dict)
        users_ref = db.collection(date_)
        users_ref.stream()
        parsed_raw_datas.append(country_dict)


country_list = []
for key, value in cities.items():

    request_url = url_format + value + "/" + key
    response = requests.get(url=request_url, headers=headers)

    if response.status_code == 200:
        print("Status_code", response.status_code)
        print("Request Sent Succesfully")
    else:
        print("Status_code", response.status_code)
        print("Request Failed")

    print("Request_url", request_url)

    dom = html.fromstring(response.content)

    name = parse_data(
        dom_=dom,
        selector="(//div[@class='info-content']/span/text())[2]",
        name_="City            :  ",
        process=lambda raw_data: raw_data.strip().split(" ")[0],
    )

    date = parse_data(
        dom_=dom,
        selector="//div[@class='info-content']/span/text()",
        name_="Date            :  ",
        process=lambda raw_data: raw_data,
    )

    degree = parse_data(
        dom_=dom,
        selector="//div[@class='short']/span/text()",
        name_="Degree          :  ",
        process=lambda raw_data: raw_data,
    )

    weather = parse_data(
        dom_=dom,
        selector="//div[@class='info']/span[@class='description']/text()",
        name_="weather         :  ",
        process=lambda raw_data: raw_data,
    )

    wind = parse_data(
        dom_=dom,
        selector="(//div[@class='detail']/span[@class='description']/text())[3]",
        name_="Wind Speed      :  ",
        process=lambda raw_data: raw_data,
    )

    windway = parse_data(
        dom_=dom,
        selector="(//div[@class='detail']/span[@class='description']/text())[2]",
        name_="Wind Direction  : ",
        process=lambda raw_data: raw_data,
    )

    humidity = parse_data(
        dom_=dom,
        selector="(//div[@class='detail']/span[@class='description']/text())[4]",
        name_="Humidity        :  ",
        process=lambda raw_data: raw_data,
    )

    pressure = parse_data(
        dom_=dom,
        selector="(//div[@class='detail']/span[@class='description']/text())[5]",
        name_="Pressure        :  ",
        process=lambda raw_data: raw_data,
    )

    sight_distance = parse_data(
        dom_=dom,
        selector="(//div[@class='detail']/span[@class='description']/text())[6]",
        name_="sight_distance  :  ",
        process=lambda raw_data: raw_data,
    )

    high_degree0 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[1]",
        name_="high_degree0  :  ",
        process=lambda raw_data: raw_data,
    )

    low_degree0 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[2]",
        name_="low_degree0  :  ",
        process=lambda raw_data: raw_data,
    )

    day1 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span/text())[1]",
        name_="day1  :  ",
        process=lambda raw_data: raw_data,
    )

    high_degree1 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[3]",
        name_="high_degree1  :  ",
        process=lambda raw_data: raw_data,
    )

    low_degree1 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[4]",
        name_="low_degree1  :  ",
        process=lambda raw_data: raw_data,
    )

    day1WeatherIcon = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span[@class='img']/img/@src)[1]",
        name_="day1WeatherIcon  :  ",
        process=lambda raw_data: raw_data,
    )

    day2 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span/text())[4]",
        name_="day2  :  ",
        process=lambda raw_data: raw_data,
    )

    high_degree2 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[5]",
        name_="high_degree2  :  ",
        process=lambda raw_data: raw_data,
    )

    low_degree2 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[6]",
        name_="low_degree2  :  ",
        process=lambda raw_data: raw_data,
    )

    day2WeatherIcon = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span[@class='img']/img/@src)[2]",
        name_="day2WeatherIcon  :  ",
        process=lambda raw_data: raw_data,
    )

    day3 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span/text())[7]",
        name_="day3  :  ",
        process=lambda raw_data: raw_data,
    )

    high_degree3 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[7]",
        name_="high_degree3  :  ",
        process=lambda raw_data: raw_data,
    )

    low_degree3 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[8]",
        name_="low_degree3  :  ",
        process=lambda raw_data: raw_data,
    )

    day3WeatherIcon = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span[@class='img']/img/@src)[3]",
        name_="day3WeatherIcon  :  ",
        process=lambda raw_data: raw_data,
    )

    day4 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span/text())[10]",
        name_="day4  :  ",
        process=lambda raw_data: raw_data,
    )

    low_degree4 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[10]",
        name_="low_degree4  :  ",
        process=lambda raw_data: raw_data,
    )

    high_degree4 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[9]",
        name_="high_degree4  :  ",
        process=lambda raw_data: raw_data,
    )
    day4WeatherIcon = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span[@class='img']/img/@src)[4]",
        name_="day4WeatherIcon  :  ",
        process=lambda raw_data: raw_data,
    )

    day5 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span/text())[13]",
        name_="day5  :  ",
        process=lambda raw_data: raw_data,
    )

    low_degree5 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[12]",
        name_="low_degree5  :  ",
        process=lambda raw_data: raw_data,
    )

    high_degree5 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[11]",
        name_="high_degree5  :  ",
        process=lambda raw_data: raw_data,
    )

    day5WeatherIcon = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span[@class='img']/img/@src)[5]",
        name_="day5WeatherIcon  :  ",
        process=lambda raw_data: raw_data,
    )

    day6 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span/text())[16]",
        name_="day6  :  ",
        process=lambda raw_data: raw_data,
    )

    high_degree6 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[13]",
        name_="high_degree6  :  ",
        process=lambda raw_data: raw_data,
    )

    low_degree6 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[14]",
        name_="low_degree6  :  ",
        process=lambda raw_data: raw_data,
    )

    day6WeatherIcon = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span[@class='img']/img/@src)[6]",
        name_="day6WeatherIcon  :  ",
        process=lambda raw_data: raw_data,
    )

    day7 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span/text())[19]",
        name_="day7  :  ",
        process=lambda raw_data: raw_data,
    )

    high_degree7 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[14]",
        name_="high_degree7  :  ",
        process=lambda raw_data: raw_data,
    )

    low_degree7 = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/div/span/text())[16]",
        name_="low_degree7  :  ",
        process=lambda raw_data: raw_data,
    )

    day7WeatherIcon = parse_data(
        dom_=dom,
        selector="(//div[@class='widget-weather-day-list type1']/ul/li/span[@class='img']/img/@src)[7]",
        name_="day7WeatherIcon  :  ",
        process=lambda raw_data: raw_data,
    )

    time.sleep(0.5)
    print()
    print()

    country_dict_data: dict = {
        "city": name.replace(" ", ""),
        "date": date,
        "degree": degree,
        "weather": weather,
        "wind": wind,
        "windDirection": windway,
        "humidity": humidity,
        "pressure": pressure,
        "sightDistance": sight_distance,
        "day1": day1,
        "day1HighDegree": high_degree0,
        "day1LowDegree": low_degree0,
        "day2": day2,
        "day2HighDegree": high_degree1,
        "day2LowDegree": low_degree1,
        "day3": day3,
        "day3HighDegree": high_degree2,
        "day3LowDegree": low_degree2,
        "day4": day4,
        "day4HighDegree": high_degree3,
        "day4LowDegree": low_degree3,
        "day5": day5,
        "day5HighDegree": high_degree4,
        "day5LowDegree": low_degree4,
        "day6": day6,
        "day6HighDegree": high_degree5,
        "day6LowDegree": low_degree5,
        "day7": day7,
        "day7HighDegree": high_degree6,
        "day7LowDegree": low_degree6,
        "day1WeatherIcon": day1WeatherIcon,
        "day2WeatherIcon": day2WeatherIcon,
        "day3WeatherIcon": day3WeatherIcon,
        "day4WeatherIcon": day4WeatherIcon,
        "day5WeatherIcon": day5WeatherIcon,
        "day6WeatherIcon": day6WeatherIcon,
        "day7WeatherIcon": day7WeatherIcon,
    }

    country_list.append(country_dict_data)
    # doc_ref = db.collection(today_str).add(country_dict_data)
    # doc_ref.asd

db_writer(country_dicts=country_list, date_=today_str)

# for doc in docs:
#     print(f'{doc.id} => {doc.to_dict()}')
