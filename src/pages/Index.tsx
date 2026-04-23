import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ServiceViewer } from "@/components/ServiceViewer";
import { Quiz } from "@/components/Quiz";
import { parseXml, type ParsedService } from "@/lib/parseXml";
import { Shield } from "lucide-react";

const IMG_GOKU_RIGHT = "https://conteudo.imguol.com.br/c/entretenimento/1a/2018/02/01/o-personagem-goku-da-animacao-dragon-ball-1517521178505_v2_4x3.jpg"; 
const IMG_NEYMAR_LEFT = "./images/neymar.jpg";
const IMG_GOKU_MODAL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExIVFRUXFxgbGRcYGRcYGBsaGBgYFxgaGBobHSggGBslGx0aIjIhJSkrLi4vHyAzODMtNygtLisBCgoKDg0OGxAQGi0mICUtLTAvKy0yMC0tLS8vNS0rLS0tLS0vLy0tLSstLy0tLS0rKystLy0tLS0tLS0tLy0tLf/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcCCAH/xABKEAACAQMCAwUFBAcFBQYHAAABAgMABBESIQUxQQYTIlFhBzJxgZEUUqGxIzNCYnKCwSRDkqLwFbKzwtE0RFNU4fE1Y3N0g4ST/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAEDBAIFBv/EADIRAAICAQIDBQcEAgMAAAAAAAABAhEDITEEEkEFIlFhwRNxgZGhsfBC0eHxFDIzUmL/2gAMAwEAAhEDEQA/ANeoooqAFFFFAfGYAZJAHmdhSSXcZOBIhPkGUn86zj2vdlJJEN7C7P3QzJA5LLoA3eIE+AgblRsRk8x4sfimicbqB8gRU0D1divleZLW9mix3U80Y/8AlyOg+ikVP2HtA4lF/wB47wfdlRXH1GH/AM1KBvlFZjwf2uIcLdWxT9+I6l+JRsED4FjV/wCDcat7pNdvKsi9cbMuejKcMh9CBUAV4pfpBE80mdEY1NpGSAOZx5DmfTNNuCdoLa7BNvMr495d1df4kbDAeuMGpGSMMCrAFSCCDyIOxB9MV5t4hbvZ3csSOyvBKwR1JDac5Q5G+6Fc/E1KB6UorNew3tI71lt7zAc4CTbKrNyCyDkjHoRsTtgbZ0qoAUUUUAUUUUAUUUUAUUUUAUUUUAUUUUAUUUUAUUV8dgBknAHWgBlBGCMg8weRHrXmHtx2dNheyQAHuydcR842JwPXScqfh616THFYMhe+QMeQZgpPwDYJqt+0/sl9vtf0Y/tEOXi5ZbbxR58mGMeoX1qQefIJiKexzg86Ywj6+R5g9QfWnCxVJA6Ipaxu5IZBLC7RyLyZTg/A9CD1ByDTWMkfCiSQA4G9SDduwPbZb5e6kAS5QZZR7rqNi6f1XpnqKzT2qQhOKyn76ROf8Gj/AJKq1rftHIkiMUkRgysOhH+sEciMg7VLds+Pi9uY5wmhvs8ayL0EivLnSeqkFSPj5g1AImRela/7KO15nX7HOxMsa5jY7l4xzBPV129SPPBNZG42zXy0u3hlSaNtMkbBlPkR+YPIjqCRRg9RUVG9nOMJd20dwmwcbj7rDZ1PwYEVJVySFFFFAFFFFAFFFFAFFFFAFFFFAFFFFAFFFFAfHUEEEAg8wdwfiKjjwsx72zd1j+7OTCfTRn9H8Ux5kNyqSNMpuL26HDXEKnyaRB+ZoDEParwURXH2pIzF3p/TRbYWQ/3iEbPHJ94cmyGwWxVThfNekuO8Ht+IQNFJpkQ8mUglG6MpHIg/XrXm+8sXtp5LeQYeJyp9cciPQjBHoRXSB8uZNKlqj4L5cYIIPnzpzxP9X8xUMKEEr3gPKhWxTK3NPVFAP4myKTekIZNJ9Ov/AFpxJzqQaf7D+K73FqT5SoPokmPT9X9TWr1519nnE/s/Ebdv2Xbum+EvgH+fSflXoquWSFFFFQAooooAooooAooooAooooAooooCtdrO21tY+B8yTEZESYzg8i5OyD47noDWacU9pHEJv1ZS3XyjUM2PIu4OfioWk+13YPiMcssyr9qV2Zy8e8m5z4oz4s9MJq2A5cqpkc+5ByCDgg7EEcwQeR9K6RBIXs80366WSXr+kdn+gYnFIC3x0r4r0qrVIEoso2pCUb7ykq31G9JcTmkmcSySNI4ULqclmKrnGSdzjPWnuaSuAoGTt/X4UA0ADLg8iKg5IipKnpU0qk+g8hXZgHUCoBCx09havs9oBuvLyriPagF3WiN9sfSlBuK5jjwcmgOTMVIdc5U6h8V3GPnXqq3nDqrqcqwBBBB2O/MV5d0A1Kdm+0tzYPqgfwZy8Lbxv57fst+8u/LmNqNA9JUVEdlu0MV9As8W3R0PvI45q35g9QQad8R4nHDpDklm2SNAWkc/uqNyB1PIcyQK5JHlcNMoYIWUMRkLkaiBzIHMiosQ3M+7v9mT7kZVpiPJ5MFU9QgJ8np5w7hkUAIijC595ty7HGMu7ZZ2x1Yk0A7ooooAooooAooooAooooAqA7TdjbO+GZosSYwJk8Mo8vEPeA8mBHpU/RQGBdqvZ7d2WZEzcwD9tF/SKP34xk4/eXI6nTVWguQeRr1OAaz3t37MY7nVPaBYbjclcYjlPM6gPcc/eHPrnmJsGRpJTYHW2enT4VxcpJG7Qyo0cqnSyMMEf6G4PIggiupZNK/GuiDqWUDYUh3hNM3uR51JcPhzuagHUcXnXMqL5DNOpCBTSPc58/8AQqQdxR4FdOK7ppPcAbk0B9JORiu3PmMUjpl8DMjIjgshIxrAOMr5jl+FOpEytQCZ9n3HpbS8CxaT9o0xEOSEDMwEbtgEnSSdhjIJGRnI3rhnCVhyxJkmcDvJnxrfHIbbKg3wg2HxyT5guLfKZHUf+9SVlxu5jwY7qdPRZZAP8OcfhSgenKKwKx9onEo/+8CQeUiIw+qgN+NWvg/tdGwurfHLLwnI+PducgfBiaiiTUqKieCdpbS7/UTo7Yzo92QD1RsMPjipaoAUUUUAUUUUAVV+1Hbm2s2MZ1SzbZjTHhyMjWx2XIxtudwcYNWiqp2q7A2t6xlOuGY4zJGR4sDA1qfC22BnY4AGaAo3EfajeP8Aqo4oR8DIw/mbCn/DVdu+1d/J795P/I3d/wDD01LcW9mHEIcmIx3Kj7p7uT/A50/RzVQvo5YG0TxSQt5SKVz/AA52b4jNdaEC011I/vyyN/E7N+ZriOZ13V3U+YYj8jSAmzXWupBzeyu7B3d5GAwC7sxxzwCxO2c7etIC0Lbv9On/AK0t3ygkseXIf1pCa+P3WPyNAI3VquScdB/0qTgbCU2a2k27xGTWpK6hjI3GR8+nw8xXcJBUahkAjUPMZ8QHxGd6ixRe/Z/2NE+Lq6XMXOKI8n/fcdV8l68ztjNHMWlmT7rMv+Ekf0rUOAe0S3YiOaMwDkGzrQdBkgAr9Meoqkds7MQ30wGNEhEqEbgrL4iR6a9f0qmEpcz5i/JGPIuUg7hjsoBJONhuSTsoA6k+VaP2S9nqLpa5AedgGYHdYVyQFXzdiCNfTDEYIGYv2U8DE901y+CkOyjzkYc/5VP1YeVatwxh3ZkP94zP/LyT4eALt55rnNkeyO8ONVbM39sNuqtZhQBhZgABjYdz9APKqIdlJ9KtvtP4kJrxY15QJg/xvhmGPQBPnkdKhOGQRZEtw2mFT4RzMrg4woG5VTzPLOBnnVmPuwVleXvZHRFWrBoxj/Wd6aoOY8jT0lNchQ+DUSDjGx35HlvUG92Sx0gkZqwpJPVRqFPuzfZG6vv1c1qh+68y958TGmph8wKvnDvYqedxfH1WKMD/ADuT/u0sGahwCDnBByD1BHIg9DV07L+0u6gZYpCbtTgBGJM38jAFnOM7MDnzFX3h/sq4bHjVFJMR1lkY5+KppU/SrVw3hUFuNMEEUQ8o0VM/HA3+dRZI4t5dSK2ll1KDpYYYZGcMOhHIilKKKgBRRRQBRRRQBSV3apKhSRFkQ81dQyn4g7GlaKAoHHvZRZzZa3LWr+S+KLPrGx2/lK1m/aDsNf2eWeLvYh/ew5cY/eXGtNueRgedeh6M1Ng8qI4O4NTfZGJWvLdW5GQf1rRe3drwSQs0kyR3HV7bxSavKRUBVj/Hg+orJ7W7ME6yJqcRuGVtOksFOd1BOkkdMnHnR6omOjTNW7Vdko7iMGMCOZHfSwAxgEjDDbIOBVEtOC6pjDIdJA2dDkEHDAjPMHPIgVp1rxeG4hZ4zrVvECMnGdykgG6kNnnjI688VbtLbdzcRSgfo2AAbfHM7fIHptjFZITku6bckIvvElw72b200GgyNHcJzkTJRw2dLNG5OOoIVhuudgcVQO2HB7mydIJyGCgmJlJIKE4IGd13AOk8jnHMk7JwifUoKsVYAgEEcjgkHKsMZA6Zo472eS7VRcoJdOSCeYz7wBj7o4OBtvyG21WxzL9RRPA07jsQ3swsGHDAR4XkaVgfiSik/wAoHyq4XMbCI9yFLKrd2rHCaseDUQDtn0qpDsuYmzYzvaBvehy0sbeZCyLqiJH7QyM9D1U4tb3ZcILlYEOz6MFyNTEBXdcRkKSM4OcDlzqmVOW5fG1HYoHE+FpaH+0SC5u5GyIY8kM7nnI2AzZY+6AuTtuKXi7C3Eima7lEbEYWMAMRt4VODpjUDOy5wB8qtvDuxUEUwuEDs4OQXZpfFjGvx6CT8yM8sbV32lvWERB3c+FVAC7scAe+2STgc6v9ols9Sj2Um9VSKP2e7MmWUkMRCkgVeWpyWC6uWNIOfmKq96iiWQDkJHA+AYgVrlqEtbRHdhmIEt8EOpvqR8yR51jfD+HXlxvFbTy6jzSNyuTz8WMAfOmKTk22RmgopJHw45EA1ZeCdtL21x3dwzKP7uXMifDBOVH8JFcWPs24tIf+zBB5ySRr+AYt+FWKx9jV23667hj9EV5fz0VcUF57G+0KC9IicdzcHkhOVfG57tup/dO/PGcZq5VnvAvZLawSJLJPNM8bKwHhjTUpDA4UatiOWqtCrkkKKKKAKKKKAKKKKAKKKKAKqHbbsZJfsCL2SJQuO6K64ick6iodfEdtznlVvooDHpPY/cj3byE/GN1/JjTWX2QX2fDc2xHr3g/DQa2uipsGLWnsx4tA+uG5tlbzDyr8iO7IYfGn/aTh/E+5jhuhaNqc6HiZ9WoKWxpZRzAO/Ktaqu9t7NGhSYrl4ZEKtvt3jrGw9QQeR8hXE0nqdwk066FO7H8TyoB5jY58xtvV9tbgYrNuN2jWk3fhT9nlILMOUch56vJWO+fMkeWbFwviYYDfNZJLqjfF9GWe/lOg6RlsHA23PkM1XOG8SeSYt3MsahAp71dGXBOQoJywx15U7um1r4YkkYcu83X5iozDK2qSGFCM4MQIzkdeRPwqEGTt1dgDnWa9o+PKtymY5JVQlisa6jkDw58hnf5VLcc4xpGBkk7ADcknkAOpq5ezm0MdkpbAeR5HfHnrKAE9cKoFW44W9SrNkpaGD8a7RPMSrDuk1ZKcmJ5jvGIyxHQHYU44B2vuLVh9nuDjrGx1xn4oTt8VwfWvSzb896ZXnB7eUYlt4ZB5PGjfmK0qkqRjbbdshuxPbKLiEZwO7mQDXFnP8yH9pM9eY69M2aoWw7JWUEwnhtkikUEAplRhhg5UHSdvMVNUICiiigCiiigCiiigCiiigCiiigCiiigCiiigOZHCgseQBJ+A3NYFecauLqUTtI28gOgMdIQkEIF5YG3xxnnVv9onalpJTZwSYiC/pWQ7uxJBj1fdAG+OZODyIOe8PcodDcxt8fI/Ss+WfRHs8DwtRuf6tF5G48MVZIQrAEFcEHfIIqm3fAHtnJt90z+qJwP/AMZPu/wnb1FSXYvjQIELthv2Cf2h5fxD8frVovrfO9UKVHOXC4S5Zbla4TxuPk50sOatsw+INR3aHjisdEXjY9B+Z8h6mpm9sI2GHRW9GUMPxplY8HXVhUCjPJQAPoK6TW5U1LYZ8A4MFQ3EuGkOcHoo8lz+fP4U/wDZt2oeZ2tnwVGsxMBg4V8FT57HIPPY86ddopRHAwG2Fqidj7lba9tQDgNIwOrGQJQyjJ89TLXUJa2WLApY56bL6m40UUVrPJCiiigCiiigCiiigCiiigCiiigCignG55Cqf2s7aRRwOtrKsk7DSughgpJwW1YKZUZIBzkgdM1DaW53DHKbqKstN5exxLrlkSNcganZUXJ5DLEDNQVn284fJM0K3K5X9r+7bp4ZPdO/qKy6SCS7xLcSyTsnLvSNKDrhFARDtueowckYNOooUjxyPpyHXqeY+AI9aplnrZHq4eyXKNzlXktWaDxvt5bQkpHmdxnZCNAPkz8v8IbFU66v7/iOQAe7GSVTwRgfvsT4jjzPwAptDeQpki2SR/2TIX0geqAAOeXkNuVc3091cY162UclC4QeWFUBfnjNVyyX/Bsw8Ase0dfGXov6EeMcHgiiytyJZ1KgLEMxrnmrueYwDjTyIFQzQLJzyrjr1Hx8xU/aWL+NPCNSnYuo3XxjYsPL8aZz2IyCWjHqHQnf+Ekn4YqtvwRuxwStSlfy+lDWzV18L7jGzD+oP5VaeB8auDJHD37lWYA5CMQOuCyk8s1XZ2ZVUB0kVWY6QrhvGFBOSoBHgXbOd6fcKv4o5FkcMMBhjAByylQcNgbZzUdUTKKljlatq6v6VY9j7cu6lhbOwX3m1gqM8tREIA+op83at+5jmiEY7xpFKspJHd6OofcHV5DlSFr2gKiNUuiFQMApto1RgVxhljmHL0FMOM90yRrEUwveE6FKJl3JGlWJx4QucbZzjaupRSX+1mPFGOTIo+wcV422qp7/ABoY8Y408nilfOOQGyj5D+tViZmZWfq2FQdcZ5/M/kKlJLdM75Y+XT6CuXtXJDspUfsgjHz/AOlRF0askP0ql5L7lw4V2gntgJEuGuoVOJInz3ijzQtnkN9mI8wOY0jhXFoblNcMiuNsge8uejLzU+hrFrZyEcgkFWiII6HEu/8Ar4dTTuC4jDBhrt5BylgOAf4o8jbz0nH7tXQy1uebxPZ3O249PD1S+6+RtdFZHccTu28R4gzjIK902gYUD3gFU5YnBVt89KVsu2V9CRqkS4Uc1lUI/wAA6AafiVarPbR6mBdmZ3HmjT+/1NXoqL7O8bW7iLhGjZWKujYypGDzGzAgg5Hn0IIqUq0wSi4umFFFFCAooooAr45wD8Pj/wC9fage3fEDBYXEgOG0aVI5hpCIwR6jVn5UJSt0ZU/GLi9CmWZmLAZTOmPDHOQuwwD57jG/I4sa8BtbbP2ucMyjaCA6m/nbkv4fGqVwZ/0aryI3VvI+R/dO2fLAPTBkZMFMrsDnYdD1H+vXyrFKSu9z6vDik4KKfKvJb/HoTvFuKIVi+z26QoNXQu5YHHiY8zp0n51D/aW/d/wR529dOc+tLQLqjcdVw4+Huv8A8p+VRXFXZYZSpwwRiCPMAmuHJto1QxwxQlpdX5vx6kgbqT/xGH8J0j6LgU0WRXbSD3jD9lQXf/CuT+FXm14RA0jJDEumJgpJ/SSEjGss8mpk3yAAR1PlUpb8TuLWG6ZEE6wqmkHCYkyoZCyruAjB+RxuMjO1OPPinneC3a+X58DBk49xg5Qglpev9epR7LhF0Srx2c5wQRqTu849JStOW7J3oBYWj4ycLrh1YzsdpMcvWrFZcY4tNqEUWMTWx7wxBEMTk9+oDudWkYyVc+QOaf3F3xtmCi3jQCS4UyJ3XiVdP2aTRJMdKtk5GSwx06+j/jwPMfa/EN2qXwKtw3sNfS7lI4VxnLuHb5LESPq4+FVuwuC8aOVzqVWK/EZOD1rR2TjcbqSVZWex1rGIioGSLwAMNQU7HP0xWewR4MkfLRNMg9NErqPwAqrPjjGNo9DsvjcufNKOR9CxdnhG4uEaNG7y2kKalU4kiQgadQ2bSSc+gqBwNCEADKDpjzH9Ke8Hu+7kVjtocE8/db9HJ8yrfhTC3/Uw56RgfQtVMncEehix8nES869fSiY/2NH3EJe6hiaXW6rLlVIBVD49xkaRzxzptc9mLhVLRaJRtkwSK/4Kcn6Vx2wXPD7Fuoadf85NUtCQcgkEciNiPgaiU1F7eB3gwZcsG1P9UlTV7N+FepcLaymAYPbndT70Tr7uGA8OnyPrvzqPjkwdJRdv4wfxao+1vLxziKW5dh0RpWI/wnaloe09wG0zhLjTtidSzjGxGsESA/E0500HgyQlpT8k2vz6DiTSGBIZQdiVOfhtt+dLRzKGAY5XyYYzzJG2R8zjnXE/aWBxiSwQDzjllVh6jUWB+Yp12i4ascUEiMzLLGJF1ABgDjY42JHI10tdUVTuMuWScW9tn9VZN8LiuFHeWV0hfHjtg6ltjudDZDZJJyNwCBmpfhntB05S8hZHBxlFOM8sMjHUv1Pyqj8NGWVv3JP+G9O/9tPLFpmCyMm6yt+sXScAFv2xnHPJ2+lkclIxZ+CU5U1fns9fubFZ3SSoskbBkYZBHXp8jnpS1V/sCF+wQ6cf3mcfe719Q+IbIqwVqWx87kSjJpbWFFFFScBWd+2Pi4jhhhBRmeTU0TA4KKDhiVIK+PGPPfyrQLmdY0Z3OFRSzE8gqjJP0FYJ2jgmuL5Xlz/aWTR+6rEKIxnquQPx61Xlk4x0NvAYY5c1Sei1+Q5m4aI47dlGkyxCQoXU6AxOgAnB3Uat88xSjDSQDjS64bBB8WTg7E9MD5Dzpx2ik1Xc7DkJWQDyWM92oH8qimWrU+luXdjy5Fn5Y5b59fwrJJq2fSYYyUIJvf8Aax9ZSaW3305BHQqdj+FM+LW20kZ8mX8COtdxy6QCRkr4W5/Jsg/hTy/mbQsg22CtpAB2HgO2/ujH8lco0Sk3030f58yUn7UmRY2HDAXEaqzzzFFOkfdjDBxnO5Od/Wm6dtLxAIopLC2ByRHbxNK5PUgBjk/y1K9heEwXNjcL3UbXIaVRMyK0mph3kR1MCSFDKMHbbFRXA+IzGGzkiMkbXdtcQggqUa7QMFdkz+ixpb3RjPQAb7VC+94+R8pkywg3jcW68ZPp5KhunEr2VxGbriDyMSAitDasSOiozRt1BI00lPb3OrunTiBcsqaJL9CpdyNKP+nGksDsOZyMc6lLiQXHBILC3Ui/RoF7rSwlimSQF5X2zGuA7d4dt+eTipnjXD7iO5mkshcpM80ReFojNZ3HuZlD6dNuwG5OoHKDA5Gu+TzZQ+I/8x+RVLDs/MzqsVuqEu8etZrkL3iBi6d4jEZGlhnOMgjJNE8H2eSS3kt0V0YFiJJX1GQCTOpmJbOTknfOat1pwKVLxZYI5bP+1ObgmdGtJo2ZgCsWssJZMpgaVwS3pmK9oMeOJMekltEfmkkyN+Giqs0Kg2eh2bxDlxEYutb208+hDrImoZTAbKnDkDD+HJ8JOBnl6UnbOBCg7vcalOpm5rpzyOBkn8K5Zceor7ASY+ef0kmT6nB/pWNS0Po54ksievzZIcZgjk4bC8kvcQwyyd45VpCC7AKQqjJ3YD5irB2P7G8MMsiazdTQFe8VgRGhYHT4caWzg7EtUfwzhxubCS3wCGnXVqKqoQPbu5yeeFBOPPFR1h2Q4hDG6PArNIbRpHeZBqZO+EugLKNbjvVwJPAdBONlzsx44ySk1qfN8ZxmfFknhhJqNvbz133NK7V8TFlba44lIDxLoB7sYkkWLIwpAwWB5dKq69mrbi6NNpeCVWdC40klo3aNtQ5OuV2OxxjlVU4xbXAbN136+DhqsS+qFpEljFw50sUPuhtRwfqac9k+180CiOERus8wYSEaliM95dqwYIw1eCMEDI3J3xgVdKKkqZ52LNkxS54OmQPazsRdWQLOoki/8RMkD+Ic1/L1qW4gdXC+HnrouB9JcD8ql4/aVPMsrNaxGKOK1LgOyvqu0GhQCpDLrOCdsA535Uy7RTwtZWncrpjKT4UH3SJfGP8AFq/9KzSwqCbR7WHtKfEzhHItU9110ZB8K/Us3oFHxY5+mlSPmPOmrtpgJ6u5A+C5z+f4U6gIW1UKQScvzIzkAKNxgEAefMnntSFwB+r3OmLGxUZbwyNkkHkM+uNuu1SWp6Lydy/zw/k0D2PXebJozsUlk0g9UOltQ8xqZhkdavdZ77K5U7uPB3McseCckGKcy4zgDdbhTjHL4VoVbY7HyudVkfvCiiipKSre0syGxaOMMWlkjTw7+HVrfPoVUqfjVc7MJJrRbgawJY2GpMaSJiFK5A3x19PI7yXtPhmkNtHCyI2p31lnVvCFUKNP7J1ZJ/dFVye74tbRGWWNZYowWZw0ciqF3yc6JPpS/IshC9VJJkcuWeTPva3z8dRz+NM3Gm5kXyVByxuB4sjzDZHypTg15qeSRgvNn07gZJyAOuMkbeVJyIe+1c8jc+Z55rz3pZ9lF8yg/A6fdiPvrj+YcvqPypxwyXvI9PVlKjbPjG6gY5ZYAfAmmFxJjxfdIb6Hf8M0QNoeRQT4X1A7gjO+3Ub0W1iT7zj4/csHYDtFBazy9/KIo5Y1O5PvxsQQuncsVcct/D6VL2naXh0KxNFADIve6u6guCRrz+pknCqurbUSRmqQSq3H7jEHAPIHBwD6ZK/KtKuOBWod44rO6uDGQHZZYkVSyLIMmSVM4VlOQCK1QlKqXQ8Hi8OBZPaZG+90SX3sjI+384EZW1lcx6t3nSIPq2GtEWQbDlvzpK57a3EhkzaQgShAwNxKw8GSCqiIYO+++DgZpwb7hq+FobcEcweI24I+P6XnXK8Q4Z/4dp8+JQf0lNS/a+RVGXZ63U38hpedprxmYhLNRII2YGOaQnuz4M6pQMqRzxvgVHcQv57mZZbiRGKIyAJHoxqZWOfEc7jb4mrvZ8HjmRZIrGCVCMBkvWccydiF0ncnrXSdl1zvw4j/APazXEoZZaWjRg4rgMTUlCVrr+MoD7fCuLU4Rv8A6n9GrQH7LLn/AOHSY/duVI/zEV9tOyQwcWMeNR2ku5Q2224SJl+hNVrh5m6XbXDvpL5L9yvdmOJ2yq8F1F3kZJk3QOo3iGSOeQyrjANWn/a/B8LkKdIwuqGY6RkMACU2GrB26786ajshhzixgXKkHTe3HIkE84PMCurjsYuD/ZGH8Fzk/LWg/GroxyRSSo8vNl4LNklklzpvwob2tvavJ/Zbnu8ZwFc8yAMtG+5xpGNvPzNL39lOUMJFrOjkFg8RjJIKkN4chiOnLfG4xUNB2QTLKYr8bjrZuNsj9ltWNz08qbXXAe4OqC4uYHG/jt5VT+Z0Gj61YpT6ozSxcO75cnzXqv2JqHgAAmB4V4ZwolaO5UgiI/oWVGYBCuARpxpwBviqv2zhWGC1iVWRUgkOlveyz5OrzOc5qxcKveJyIGjvbeRfRoTj45jqkdsuI3BnKXBQtGm2nGCHIbmNiOvLrXGSVxqmaeDwcmZTUour2fkxMgARoeShc79Ilydx56fxphKxyCebayds7srH+vPpj0pZ3JBJPvEJzOejyHHUYCj+akLggyIvm2OeNypA3+P1rMtz2pf6PyVE52IuzGGYbdzNHOfWJlaC4Hr4WjIHmBW0g1gC3SRGUM4TXBKgJBI1MBoGw+9g/Kt14VKGgiZSSrRoQWGCQVGCRgYOPStWJ3E8DtKHJmaHVFFFWHnmV9uJbqW/dY8iJESMEBTjvNOp+epWUuW2GMJv5BpecYlNj9mk1GS7Mh0sAvcWwcKFO2pnYDHi82PTBYX/AA3ivezXEJkZJJHYBWjnIUsWA0OqnAG2Fz8KiDxaaafXLoDIqxkKGU7MzeJG3Q78q5nLli6NfCcOsuWKlt1/Nx49p3bEo5CvgEMOWCGGWXOclfujlSxjbOSpxjcjDAfErnHzr5xkZjGOeoNz6DIG3rkn6edfLWc4BrC3a1Pq8cHGTUXp5jMkH55FINIQ4J/aiXPxHh/MGnPfLrbUgYhxvkg4O/QgE+rAmo28uPHp6KrBfPBdmGfr0xXSRRkm002uo7u/eibz1ry28Ok8+vv/AOtq0Ljrd7IINu6mvrBJFOcOptg7I3mp0Lt1rPLdCwjYkLhmIyTvkDcKB6e9yq98SiVP7QWIWG5sJJOZ0qIlRnPoobJ9Aa04Txe02pcrXi/QnrKdI+OPZGOMRPZxvGmhQiujMD3a4wMrknH3PSnHtBn7uThsEWlGmvotQGBqiTJkU45qcqCOVVHthwt7ri1lPZ3H6No1U3MLKwi0PIzHUCVBZHwM7HPXOKccZ4A8fFuHzNevcwoWLvPJFmHSM9NIAY46Z8PwxceUWZOJWnD729Mjpbwuto/LCmaT7SrEKo2LLEudt9OakW9oPDREZvtaGNXVCwWQ+NgzKuAuckKx+VVTtDdia34tNDFLcrcFLaEwoZgTHbtlxp/uxI7rrGRnNUy14bfDhDxAcQBLtH9kFmmMsWk1lyve93jm2MhjgbUBsFv2/wCGvC04u0ESuELMHTxldQUB1BY432Brmw7c8PeGadLpGjiYFyocsoYhVJQLrI1HGQMc/KsgPCbn7Dw2RrK4K2NxL38TRMGZXnS41pGd3QplCcbH03qx8JheTit5xa3hna0EOkBYmWSV+6jjKRxNgthlyTyytAXnh3buwuDK8VwrLDGZJCQ6lUHNsMoJA9AennSR9o3DWQkXkWAQM5OASCQNx1AP0rIbTh11ax2d9bWlzHPb/oriNoXXvNywYLjU0bIe7ZsbEKemal7+4K9nu5a2lEs80jIvdOSoW7Eh1nT4fAds86kg0fhPaS0nk0w3UMjkbKsilj8Fzk0/uLrJ05O3PzrCeOXMM9rw+C0gYX0YiDOImRgVjCnL6RqxJpOrfGCc097WXicQvXezHedzbkGWKVYnZyMh8OylokOxx1PwoDXOIWMOiQyQxSHSSdaI2nA23IO9Y321/wC1yrsAkUfpskUQHz6YqzdiO0Mk/DZImctJBrVs7swILRknmeq/y1We2Mn9ruMjBeTuhuD4VbfOORBjTY4O9V5NjbwTqb93qhGzZmCAn3VO3kXbUfnjT+FcXAIkUjYqcg+RHKn1jaPzwFzv4iAcHYeHOeQHSkrmBRlmlXr7qsT+OkevOsWtn03d9nQnHwwXl+IdTIugybac4IVgNwRyYVq/s1v1e1aECQfZpXh/SNrYgeIZOTy1acZwNO21ZZwqdYJEuWDeH39x7ndmM4XGQQMNjJ3XHXa+ezoCK8vIVOpZG7zYHAII5t5nXjG/IVsx1Wh81xyyLJc+qs0OiiiuzEZB2Y4vNC8cHelJG0LiVWZPEVj1hSw16W0k4cYXUetR/ai/W8vJrmIfosRxxtgjWsYOXwd9JZjjPQCuZOzHEYoTJDKtxEqklcklRpIJCudS4Un3XP8ADSPZ+XvY1VcbKM9AFxzPkMVTnk1Gkev2ThhLK5Sey0HLYZWU55KN8fcX8M1G2rY2p0j4lccgSSPh0/Cm7bOfXesj3Z9FG+WLe+wzU5kk/iX8qjZZsSu3Mg7ZwQMY5Dz9akIz45P4x/uioOZ8s3qx/A1dDc83iX3V72T1mp7lW3yHIPLHiXPxydJq6DjVuCpWa6QlYw6xLBp8AxnMqE5/DYVTLRv0D8vCUbnvzMeAOvv/AIUtb+fU053HVD/Fx50ozvT1SL1bwQSDP9ql8mNnZyEfBlth/Wn9pb4wO74icdfs9gv0/QLU92McfYrfP3GGf53FWOFcHpWpW1dngZfZwm4qOza3/gpveyDwCTiyjkNMNjgddsQ4xXTGQ4zd8UXb/wAta5+Z+zEE1etI8qMVOviV80P+v1KVErqc/beIk/8A2sWfhkWwFcNezgsFfiLjV73d2cYPhHSSIEY5b/KrFxrj9ravEtxKkRmJCatgcbkk8lG4GTgZIrH/AGlcb4laXz6bp0hk8UPd4CaQFBU7HLDbOeeQeuK18NweTiJKKdXtfX3HPPBdPqXV76fUMtxEYG+Vsn+G0ceTSk3FJAudV+cD/wAqmPmdFVr2d+0qS4mS0vSrO20cuAupvuSAbZPQgDfbrWrFV5aF+gqviOGycPPknuSpwf6fr/Zn0PaDTqLXWnmMSWcpO3nplUeXSmCcRjZsBbCXKlHLardmVveVgUkOg9QW3xV/mhCFmA8PUDIx67UwvuHRyDJAPlnJ+uedUakt460T+f8ABQLXhdvDOrxQQKxKhjb3BdAuoFtSNoHIHkDzqmyyCWV5GHvS6hv1k71zt1G3yyPOpbtnbrHPpRdA7tTtt4t1cjHIFgar1tJlkUHOAzN/E2kHHoFAHyJ61ROV6eB63CYFCpJ3zUTkMlR/Ejq8I/aOKdQt+VJ28eX1HkKyrTU92fejy+J87QSYhUciy4Od+XhYn4kE49anfZ9dSRcRjEzlmkVk0s2nRrAkDKiAruBjDEHDfCoJou9GT7odxy9E69f6fOluGZe5sEJxLHcRR6htqjUh4T/EAGj+AStWJrY+e7W9olGcUq2PQFFFFXnkmLcfEsDPYkssch1OA2R3a8kBzkK2QDyB0EY8RJZiMRB3TGNIBA8taCofgfFJbtWmuHMkhOksQAdKgYGwHmfrUiF8EnwX/eFZMsm50fT8Bhjj4ZSrV07+I4nXOCOn5GmkqnOaUsmOj50N1qjY9V95WQ+Tl8DJL7AcycKAB86iOq+oB/D/AK5q0dkYw17bgjI+1J+Dgj8QKguKoBcSgDAEkgA8gJHAH0rTFaHhZ53JR+P1H9k+UkXoVXO2du9jPy3A3+XWn0ZpjwlcpN/Cv/Ejp3HVUzfwz3ZsHYV1NnCjHBIfH/8ARz/WrPESh0ty6Gqn2TjB4bGSNwHIPUHW1Wzhjl4FLbnHWt0P9UfLcT/zT97+5ICikbXlSxqSk88e3Sdm4npJOlIYwo6YOpifqfwprZLw7/ZTRT3BS+ZhKgZJmCgKFjTKqQFeLH1X7oFTnt2t1+3Wpxu8QDc9wJDj8zVT9qMSpxW5VQFVTGAByAEMYAHpivq+FrJhxQVrS7Xk6+tnBKdj+E8JEsT3HES0oZWCRpJEgYEEfpJFBbfHILW/THryry/2FgV+I2qsMgzLt8Nx+IFenLk15fa8XHKrk3769DqJxC+cg8qgb+UwMVPundT/AEqZsjzqK7WqDAxPQjH1rySTL/aVeap1AAzHEA3nqcmQD5Ky/U1T+H476QDkuFyOuNifnjPzq0ds1/tlx8R/uLVX4Pzc9SxJ+prJJ3zH0GHHy+yrwJe3bc0rKcIcczSFlzb406mG4qh7nrw1iKQaY4WB6Yb132O3X9mmXBFDlpX1ghxjTnKkacEgdPFq/kPpTx92I6Ff+ZDUdxSBSpyqn4gV3jlT95l4rA8kaT0i9vgb/wAEv+/gjl28a743GRs34g0+qqeyyVm4ValiScSDJ54WaRR+AFWutp8o9z//2Q==";
// ==========================================

const Index = () => {
  const [data, setData] = useState<ParsedService | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Estados do Quiz e Controle
  const [quizFinished, setQuizFinished] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [showPunishmentModal, setShowPunishmentModal] = useState(false);

  const handleQuizComplete = (name: string, correct: boolean) => {
    setUserName(name);
    setIsAllCorrect(correct);
    setQuizFinished(true);
  };

  const handleFile = (content: string) => {
    try {
      const parsed = parseXml(content);
      setData(parsed);
      setError(null);
    } catch (e) {
      setError("Failed to parse XML. Please ensure it's a valid ClearPass configuration file.");
      setData(null);
    }
  };

  // Se o quiz não acabou, mostra o Quiz
  if (!quizFinished) {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Imagens de Recompensa (Apenas se acertou tudo) */}
      {isAllCorrect && (
        <>
          <img 
            src={IMG_NEYMAR_LEFT} 
            alt="Neymar Ferrari" 
            className="fixed bottom-0 left-0 h-64 w-auto z-0 opacity-80 pointer-events-none no-print" 
          />
          <img 
            src={IMG_GOKU_RIGHT} 
            alt="Goku" 
            className="fixed bottom-0 right-0 h-64 w-auto z-0 opacity-80 pointer-events-none no-print" 
          />
        </>
      )}

      {/* Modal de Punição (Goku bloqueando o XML) */}
      {showPunishmentModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card p-6 rounded-xl max-w-2xl flex items-center gap-6 shadow-2xl relative">
            <img src={IMG_GOKU_MODAL} alt="Goku Bravo" className="h-48 w-auto object-contain" />
            <div className="space-y-4">
              <div className="relative bg-muted p-4 rounded-lg border border-border">
                {/* Triângulo do balão de fala */}
                <div className="absolute top-1/2 -left-3 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-muted border-b-[10px] border-b-transparent transform -translate-y-1/2"></div>
                <p className="text-foreground text-lg font-medium leading-relaxed">
                  Calma lá campeão. Você cometeu blasfêmias e crimes respondendo de maneira errônea algumas questões anteriores.
                </p>
              </div>
              <button 
                onClick={() => {
                  setShowPunishmentModal(false);
                  setQuizFinished(false); // Reinicia o quiz
                }}
                className="w-full py-3 bg-primary text-primary-foreground font-bold rounded hover:opacity-90"
              >
                Clique aqui para responder novamente
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-card border-b border-border px-6 py-3 no-print relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">
              ClearPass Config Viewer
            </span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Operador: {userName}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {!data && (
          <div className="no-print">
            <FileUpload 
              onFileLoaded={handleFile} 
              isBlocked={!isAllCorrect}
              onBlockedAttempt={() => setShowPunishmentModal(true)}
            />
            {error && (
              <p className="mt-4 text-destructive text-sm text-center font-bold bg-destructive/10 p-2 rounded">
                {error}
              </p>
            )}
          </div>
        )}
        {data && <ServiceViewer data={data} onReset={() => setData(null)} />}
      </main>
    </div>
  );
};

export default Index;