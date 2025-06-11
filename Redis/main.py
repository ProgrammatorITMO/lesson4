import redis

client = redis.StrictRedis(host='redis', port=6379, db=0, decode_responses=True)

try:
    client.ping()
    print("Подключение к Redis успешно!")
except redis.ConnectionError:
    print("Не удалось подключиться к Redis.")


client.set('my_key', 'Hello, Redis!')
value = client.get('my_key')
print(f"Значение по ключу 'my_key': {value}")