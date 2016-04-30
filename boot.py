import sys, os


def print_help():
	print('''
py boot.py <FIREBASE_APP_URL_REFERANCE>
	''')

def main():
	if len(sys.argv) == 1:
		print_help()
	else:
		for filename in ['./app/app.js', './app/bg/background.js']:
			change_url(filename, sys.argv[1])

def change_url(file_name, firebase_url):
	dataRaw =  ''
	with open(file_name, 'r') as f:
		dataRaw = f.read()
	f.close()

	dataRaw = dataRaw.replace('<FIREBASE_REF>', firebase_url)

	file = open(file_name, 'w')
	file.write(dataRaw)
	file.close()


if __name__ == '__main__':
	main()