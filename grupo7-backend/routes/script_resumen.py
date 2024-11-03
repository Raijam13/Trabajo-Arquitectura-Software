# script.py
import requests
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords

#Realizar las peticiones get para tener una lista de comentarios
lista = ["Recientemente tuve la oportunidad de contratar a Aquiles Hiban para un problema urgente en mi hogar, y la experiencia fue más que satisfactoria. Primero, mi sistema eléctrico comenzó a fallar sin previo aviso, con luces parpadeantes y enchufes que no funcionaban. Lo contacté, y aunque ya era tarde, se mostró disponible para atender mi emergencia en el mismo día. Su conocimiento fue evidente desde el primer momento, y no solo diagnosticó el problema rápidamente, sino que también me explicó con paciencia las posibles causas y las soluciones más adecuadas. Pero su profesionalismo no se quedó ahí. Días después, decidí aprovechar su servicio de cerrajería porque necesitaba cambiar todas las cerraduras de mi casa por razones de seguridad. Me impresionó la rapidez y precisión con la que trabajó. A diferencia de otros profesionales que simplemente cambian la cerradura y se van, Aquiles Hiban me asesoró sobre las opciones más seguras y modernas, y me dejó claro que su prioridad era que yo estuviera 100 porciento satisfecho y seguro. Recomiendo sus servicios a cualquiera que necesite un profesional honesto y altamente capacitado. ¡Excelente trabajo!",
         "Mi experiencia con Aquiles Hiban fue fantástica. Llamé porque necesitaba actualizar el sistema de iluminación de mi negocio, y desde el primer contacto, mostró gran interés en entender mis necesidades y en sugerirme opciones que fueran funcionales y estéticamente agradables. Él se encargó de revisar toda la instalación y de hacer ajustes en el sistema eléctrico para soportar las nuevas luminarias. Lo mejor fue que terminó el trabajo en el plazo acordado y mantuvo una comunicación clara sobre cada paso que iba dando. Me impresionó su nivel de organización y el orden con el que trabaja, algo que considero esencial en un profesional. Posteriormente, tuve problemas con la cerradura de seguridad de una puerta que daba acceso a una zona importante del negocio. Sin dudarlo, le pedí ayuda y su respuesta fue inmediata. No solo resolvió el problema rápidamente, sino que también me enseñó algunos trucos básicos de mantenimiento para evitar futuros inconvenientes. Su honestidad, responsabilidad y conocimientos técnicos me han ganado como cliente fiel, y no dudaré en recomendarlo a cualquier persona que necesite un electricista o cerrajero confiable.",
         "Hace poco, tuve la oportunidad de contratar a Aquiles Hiban para que solucionara varios problemas eléctricos en mi casa, y no puedo estar más satisfecho con su trabajo. Desde el primer momento, demostró profesionalismo, experiencia y un verdadero compromiso con la seguridad y el bienestar de su cliente. Había varios problemas que necesitaban atención urgente: un cortocircuito en la cocina que hacía que se dispararan los fusibles, varios enchufes sueltos que ya no funcionaban y una lámpara que hacía un zumbido extraño al encenderla. En cada uno de estos casos, Aquiles Hiban demostró un profundo conocimiento técnico. Detectó rápidamente la causa de los problemas y me explicó de una forma que pude entender las posibles soluciones. No intentó venderme reparaciones innecesarias y solo propuso lo realmente necesario, lo cual me pareció honesto y profesional.",
         "Aquiles Hiban fue un gran hallazgo, y no puedo estar más agradecido por su profesionalismo. Lo contraté para ayudarme con una serie de reparaciones eléctricas en mi casa, que iban desde revisar enchufes hasta instalar luces y regular el sistema de voltaje para proteger mis dispositivos. Desde que llegó, demostró ser alguien muy atento a los detalles, revisando minuciosamente cada aspecto antes de proceder. Además, respetó todos los protocolos de seguridad, algo que no siempre se ve en otros profesionales, y trabajó con precisión y cuidado en cada tarea. Su experiencia en cerrajería también fue de gran ayuda. Una de las puertas de mi casa necesitaba una cerradura nueva, y no solo trajo una de buena calidad, sino que la instaló de forma que funcionara perfectamente y no ofreciera ningún problema. Su enfoque integral y el interés genuino que mostró en que todo quedara funcionando al 100% me dejaron tranquilo. La combinación de servicios que ofrece es muy conveniente y representa una gran ventaja cuando se busca a alguien confiable. Sin duda, volveré a llamarlo para cualquier otra necesidad que tenga en el futuro. ¡Un profesional excelente!"
        ]

texto = " ".join(lista)

lista_oraciones = texto.split(".")#Dividir la oracion por puntos

lista_preprocesadas = [oracion.strip() for oracion in lista_oraciones if oracion.strip()]#Eliminar vacios al inicio y al final
# Vectorizar: Palabras que transformo a vector a través de TF-IDF
featurizer = TfidfVectorizer(
    stop_words=stopwords.words('spanish'),
    norm='l1'
)
def funcion_TextRank(lista):
    if len(lista) < 2:  # Verificar si hay suficientes oraciones para calcular
        return ' '.join(lista)
    #PASO 1: Tokenizar, TF-IDF y similitud conseno
    x = featurizer.fit_transform(lista)
    S = cosine_similarity(x)
    
    #PASO 2: Prevenir la división por cero y aumentar sus valores
    row_sums = S.sum(axis=1, keepdims=True)
    row_sums[row_sums == 0] = 1  # Evitar división por cero
    S = S / row_sums
    
    U = np.ones_like(S) / len(S)
    S = (1 - 0.15) * S + 0.15 * U#Aumentar valores

    # PASO 3: reemplazar NaNs (Nulos) o infs (infinitos - grandes)
    if np.isnan(S).any() or np.isinf(S).any():
        S = np.nan_to_num(S)
        #NaNs se reemplazan por 0.
        #infs se reemplazan por valores más grandes/mínimos permitidos.
    
    #PASO 4: Puntuar las palabras importantes
    eigenvals, eigenvecs = np.linalg.eig(S.T)
    scores = eigenvecs[:, 0].real
    
    # Ordenar índices por puntuaciones y escoger los primeros 5
    sort_idx = np.argsort(-scores)#Invertir el orden
    texto_completo = ". ".join(lista[i] for i in sort_idx[:4])
    return texto_completo

resumen_texto = funcion_TextRank(lista_preprocesadas)

print("resumen_texto: ", resumen_texto)
