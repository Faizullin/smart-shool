import os
import json
import sys
from googletrans import Translator, constants

if len(sys.argv) > 1:
    output_lang = sys.argv[1]
else:
    sys.exit()


    

vv = True
inp_lang = 'en'
inp_path = '.\\src\\lang\\en.json'
output_path = os.path.join('.\\src\\lang', output_lang+'.json')
output_data = dict()

if output_lang == 'normalize':
    inp_path="lang\\en.json"
    
with open(inp_path, 'r') as f:
    inp_data = json.loads(f.read())

    
if output_lang == 'normalize':
    for item_key, item_value in inp_data.items():
        if 'defaultMessage' in item_value.keys():
            output_data[item_key] = item_value['defaultMessage']
    output_path = os.path.join('.\\src\\lang', inp_lang+'.json')
    with open(output_path, 'w+', encoding='utf-8') as f:
        f.write(json.dumps(output_data, ensure_ascii=False,))

    sys.exit(0)
    
    
if os.path.exists(output_path) and os.path.isfile(output_path):
    with open(output_path, 'r', encoding='utf-8') as f:
        output_data = json.loads(f.read())

old_keys = output_data.keys()
keys_to_lookup = [i for i in inp_data.keys() if not i in old_keys]
print("Want update", len(keys_to_lookup), "keys")

translator = Translator()
counter = 0
for key in keys_to_lookup:
    value = inp_data[key]
    translated_value = value
    try:
        translation = translator.translate(
            value, dest=output_lang, src=inp_lang)
        translated_value = translation.text
        if vv:
            print("Translated", value, "==>", translated_value)
    except Exception as err:
        print(f"Translate for {key}:", value, "==>", err)
    output_data[key] = translated_value
    if counter % 10 == 0:
        print('save')
        with open(output_path, 'w+', encoding='utf-8') as f:
            f.write(json.dumps(output_data, ensure_ascii=False,))
    counter += 1
print('save')
with open(output_path, 'w+', encoding='utf-8') as f:
    f.write(json.dumps(output_data, ensure_ascii=False,))
