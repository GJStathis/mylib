import uuid

x = "INSERT INTO users (social_media_site, social_id, social_token, display_name, email) VALUES ('google', '{token}', 'token', '{user}', NULL);"

buf = []

for i in range(20):
    social_token = str(uuid.uuid1())
    user = f"user{i}"

    buf.append(x.format(token=social_token, user=user))


with open("./dummy_users.sql", "w") as fp:
    for line in buf:
        fp.write(line + "\n")